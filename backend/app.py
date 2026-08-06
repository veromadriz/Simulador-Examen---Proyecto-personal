from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory

from db import get_cursor
import connie_bot
from auth_utils import hash_password, needs_rehash, verify_password
from manual_routes import manual_bp

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
STATIC_DIR = ROOT_DIR / "static"
REACT_DIST_DIR = ROOT_DIR / "react-frontend" / "dist"

PASSING_SCORE = 80  # porcentaje mínimo para aprobar un examen


def option_is_correct(value):
    """Normalize boolean values that can come from an older database."""
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return value == 1
    return str(value).strip().lower() in {"true", "t", "1", "si", "sí", "yes", "y"}


def build_review_topics(revisiones):
    """Groups incorrect answers into a concise, chapter-based study plan."""
    topics = {}
    for revision in revisiones:
        if revision["es_correcta"]:
            continue
        chapter_number = revision.get("capitulo_numero")
        chapter_title = revision.get("capitulo_titulo")
        key = chapter_number or "general"
        if key not in topics:
            label = f"Capítulo {chapter_number}: {chapter_title}" if chapter_number else "Tema general"
            topics[key] = {"tema": label, "errores": 0, "preguntas": []}
        topics[key]["errores"] += 1
        topics[key]["preguntas"].append(revision["enunciado"])
    return sorted(topics.values(), key=lambda topic: (-topic["errores"], topic["tema"]))


def serve_react_app():
    index_file = REACT_DIST_DIR / "index.html"
    if index_file.exists():
        return send_from_directory(str(REACT_DIST_DIR), "index.html")

    return (
        "<h1>El frontend de React todavía no está compilado</h1>"
        "<p>Corré <code>npm install &amp;&amp; npm run build</code> dentro de "
        "<code>react-frontend/</code> para producción, o <code>npm run dev</code> "
        "y abrí <code>http://localhost:5173</code> en desarrollo.</p>",
        200,
    )


app = Flask(__name__, static_folder=str(STATIC_DIR))
app.register_blueprint(manual_bp, url_prefix="/api")


def ensure_result_tracking_tables():
    """Creates the auxiliary tables used to aggregate per-topic readiness."""
    with get_cursor(commit=True) as cur:
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS intento_capitulo (
                id SERIAL PRIMARY KEY,
                id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
                id_intento INTEGER NOT NULL REFERENCES intentos_examen(id_intento) ON DELETE CASCADE,
                capitulo_id INTEGER REFERENCES manual_capitulos(id) ON DELETE SET NULL,
                puntaje NUMERIC(5,2) NOT NULL DEFAULT 0,
                correctas INTEGER NOT NULL DEFAULT 0,
                total INTEGER NOT NULL DEFAULT 0,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
            """
        )
        cur.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_intento_capitulo_usuario
            ON intento_capitulo (id_usuario, capitulo_id);
            """
        )


ensure_result_tracking_tables()

# CORS opcional si está instalado flask_cors
try:
    from flask_cors import CORS

    CORS(app, resources={r"/api/*": {"origins": "*"}, r"/login": {"origins": "*"}, r"/register": {"origins": "*"}})
except ImportError:
    pass


@app.route("/")
def home():
    return serve_react_app()


@app.route("/<path:filename>")
def frontend_pages(filename):
    """
    Todas las rutas que no sean /api/... son manejadas por React Router
    (SPA). Solo dejamos pasar directo los archivos estáticos reales
    (assets del build de Vite, o cosas dentro de /static).
    """
    if filename.startswith("static/"):
        return app.send_static_file(filename)

    if (REACT_DIST_DIR / filename).exists():
        return send_from_directory(str(REACT_DIST_DIR), filename)

    return serve_react_app()


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


# ─── Exámenes ────────────────────────────────────────────────────────────

@app.route("/api/examen/capitulos")
def get_capitulos_examen():
    """Capítulos del manual disponibles para practicar de forma exclusiva."""
    with get_cursor() as cur:
        cur.execute(
            """
            SELECT c.id, c.numero, c.titulo, c.descripcion, c.icono,
                   COUNT(p.id_pregunta) AS total_preguntas
            FROM manual_capitulos c
            LEFT JOIN preguntas p ON p.capitulo_id = c.id
            GROUP BY c.id
            ORDER BY c.numero
            """
        )
        rows = cur.fetchall()

    return jsonify([
        {
            "id": chapter_id,
            "numero": numero,
            "titulo": titulo,
            "descripcion": descripcion,
            "icono": icono,
            "total_preguntas": total,
        }
        for chapter_id, numero, titulo, descripcion, icono, total in rows
    ])


@app.route("/api/examen/questions")
def get_questions():
    exam_type = request.args.get("type", "random")
    capitulo_id = request.args.get("capitulo_id")

    with get_cursor() as cur:
        if exam_type == "chapter" and capitulo_id:
            cur.execute(
                """
                SELECT id_pregunta, enunciado
                FROM preguntas
                WHERE capitulo_id = %s
                ORDER BY RANDOM()
                LIMIT 10
                """,
                (capitulo_id,),
            )
        elif exam_type == "chapter":
            preguntas_rows = []
        else:
            cur.execute(
                """
                SELECT id_pregunta, enunciado
                FROM preguntas
                ORDER BY RANDOM()
                LIMIT 10
                """
            )

        if exam_type != "chapter" or capitulo_id:
            preguntas_rows = cur.fetchall()

        questions = []
        for id_pregunta, enunciado in preguntas_rows:
            cur.execute(
                """
                SELECT id_opcion, texto
                FROM opciones
                WHERE id_pregunta = %s
                ORDER BY id_opcion
                """,
                (id_pregunta,),
            )
            # Nota: a propósito NO mandamos cuál opción es la correcta.
            # Eso solo se revisa del lado del servidor en /guardar_resultado,
            # para que no se pueda "hacer trampa" leyendo la respuesta desde
            # las devtools del navegador.
            opciones = [{"id_opcion": id_opcion, "texto": texto} for id_opcion, texto in cur.fetchall()]

            questions.append({
                "id_pregunta": id_pregunta,
                "enunciado": enunciado,
                "opciones": opciones,
            })

    return jsonify(questions)


@app.route("/guardar_resultado", methods=["POST"])
def guardar_resultado():
    data = request.get_json() or {}
    respuestas = data.get("respuestas") or []

    if not isinstance(respuestas, list) or not respuestas:
        return jsonify({"success": False, "message": "No se recibieron respuestas para calificar."}), 400

    id_usuario = data.get("id_usuario")
    id_examen = data.get("id_examen")
    tipo_generado = data.get("tipo_generado", "normal")
    es_diagnostico = tipo_generado == "diagnostic"

    # Each question counts once, even when it was left unanswered. Keeping the
    # answers in a dictionary also prevents a duplicated payload from changing
    # the score.
    respuestas_por_pregunta = {}
    for respuesta in respuestas:
        if isinstance(respuesta, dict) and respuesta.get("id_pregunta") is not None:
            respuestas_por_pregunta[respuesta["id_pregunta"]] = respuesta.get("id_opcion")

    total = len(respuestas_por_pregunta)
    correctas = 0
    respuestas_calificadas = []
    revisiones = []
    resumen_por_capitulo = {}

    with get_cursor() as cur:
        for id_pregunta, id_opcion in respuestas_por_pregunta.items():
            cur.execute(
                """
                SELECT p.enunciado, p.capitulo_id, c.numero, c.titulo,
                       o.id_opcion, o.texto, o.es_correcta
                FROM preguntas p
                JOIN opciones o ON o.id_pregunta = p.id_pregunta
                LEFT JOIN manual_capitulos c ON c.id = p.capitulo_id
                WHERE p.id_pregunta = %s
                ORDER BY o.id_opcion
                """,
                (id_pregunta,),
            )
            opciones = cur.fetchall()
            enunciado = opciones[0][0] if opciones else "Pregunta no disponible"
            capitulo_id = opciones[0][1] if opciones else None
            capitulo_numero = opciones[0][2] if opciones else None
            capitulo_titulo = opciones[0][3] if opciones else None
            opcion_usuario = next((option for option in opciones if option[4] == id_opcion), None)
            opcion_correcta = next((option for option in opciones if option_is_correct(option[6])), None)
            es_correcta = bool(opcion_usuario and opcion_correcta and opcion_usuario[4] == opcion_correcta[4])

            if es_correcta:
                correctas += 1

            if capitulo_id is not None:
                entry = resumen_por_capitulo.setdefault(capitulo_id, {"correctas": 0, "total": 0})
                entry["total"] += 1
                if es_correcta:
                    entry["correctas"] += 1

            respuestas_calificadas.append({
                "id_pregunta": id_pregunta,
                "id_opcion": id_opcion,
                "es_correcta": es_correcta,
            })
            revisiones.append({
                "id_pregunta": id_pregunta,
                "enunciado": enunciado,
                "respuesta_usuario": opcion_usuario[5] if opcion_usuario else "Sin respuesta",
                "respuesta_correcta": opcion_correcta[5] if opcion_correcta else "No configurada",
                "es_correcta": es_correcta,
                "capitulo_numero": capitulo_numero,
                "capitulo_titulo": capitulo_titulo,
            })

    puntaje = round((correctas / total) * 100, 1) if total else 0
    aprobado = puntaje >= PASSING_SCORE

    id_intento = None
    if not es_diagnostico:
        with get_cursor(commit=True) as cur:
            cur.execute(
                """
                INSERT INTO intentos_examen
                (id_usuario, id_examen, tipo_generado, puntaje, aprobado)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id_intento
                """,
                (id_usuario, id_examen, tipo_generado, puntaje, aprobado),
            )
            id_intento = cur.fetchone()[0]

            for capitulo_id, resumen in resumen_por_capitulo.items():
                capitulo_total = resumen["total"]
                capitulo_correctas = resumen["correctas"]
                capitulo_puntaje = round((capitulo_correctas / capitulo_total) * 100, 1) if capitulo_total else 0
                cur.execute(
                    """
                    INSERT INTO intento_capitulo
                    (id_usuario, id_intento, capitulo_id, puntaje, correctas, total)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    """,
                    (id_usuario, id_intento, capitulo_id, capitulo_puntaje, capitulo_correctas, capitulo_total),
                )

    return jsonify({
        "success": True,
        "id_intento": id_intento,
        "correctas": correctas,
        "total": total,
        "puntaje": puntaje,
        "aprobado": aprobado,
        "modo_diagnostico": es_diagnostico,
        "respuestas_calificadas": respuestas_calificadas,
        "revisiones": revisiones,
        "temas_a_repasar": build_review_topics(revisiones),
    })


@app.route("/estadisticas/<int:id_usuario>")
def obtener_estadisticas(id_usuario):
    with get_cursor() as cur:
        cur.execute(
            """
            SELECT
                COUNT(*),
                COALESCE(MAX(puntaje), 0),
                COALESCE(AVG(puntaje), 0)
            FROM intentos_examen
            WHERE id_usuario = %s
            """,
            (id_usuario,),
        )
        total_examenes, mejor_nota, promedio = cur.fetchone()

        cur.execute(
            """
            SELECT mc.id, mc.numero, mc.titulo,
                   COALESCE(ROUND(AVG(ic.puntaje), 1), 0)
            FROM manual_capitulos mc
            LEFT JOIN intento_capitulo ic ON ic.capitulo_id = mc.id AND ic.id_usuario = %s
            GROUP BY mc.id, mc.numero, mc.titulo
            ORDER BY mc.numero
            """,
            (id_usuario,),
        )
        temas = [
            {
                "id": capitulo_id,
                "numero": numero,
                "titulo": titulo,
                "puntaje": round(float(puntaje), 1) if puntaje is not None else 0,
            }
            for capitulo_id, numero, titulo, puntaje in cur.fetchall()
        ]

    return jsonify({
        "total_examenes": total_examenes,
        "mejor_nota": round(float(mejor_nota), 1),
        "promedio": round(float(promedio), 1),
        "topicos": temas,
    })


# ─── Autenticación ───────────────────────────────────────────────────────

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Correo y contraseña son requeridos."}), 400

    with get_cursor() as cur:
        cur.execute(
            "SELECT id_usuario, nombre, contrasena FROM usuarios WHERE email = %s",
            (email,),
        )
        user = cur.fetchone()

    if not user or not verify_password(password, user[2]):
        return jsonify({"success": False, "message": "Credenciales incorrectas"}), 401

    id_usuario, nombre, stored_password = user

    # Si la cuenta todavía tenía la contraseña en texto plano, la migramos
    # a un hash seguro ahora que sabemos que el login fue correcto.
    if needs_rehash(stored_password):
        with get_cursor(commit=True) as cur:
            cur.execute(
                "UPDATE usuarios SET contrasena = %s WHERE id_usuario = %s",
                (hash_password(password), id_usuario),
            )

    return jsonify({"success": True, "id_usuario": id_usuario, "nombre": nombre})


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    nombre = data.get("nombre")
    email = data.get("email")
    password = data.get("password")

    if not nombre or not email or not password:
        return jsonify({"success": False, "message": "Nombre, correo y contraseña son requeridos."}), 400

    with get_cursor() as cur:
        cur.execute("SELECT 1 FROM usuarios WHERE email = %s", (email,))
        existing = cur.fetchone()

    if existing:
        return jsonify({"success": False, "message": "El usuario ya existe"}), 409

    with get_cursor(commit=True) as cur:
        cur.execute(
            "INSERT INTO usuarios (nombre, email, contrasena) VALUES (%s, %s, %s)",
            (nombre, email, hash_password(password)),
        )

    return jsonify({"success": True, "message": "Usuario creado correctamente"})


# ─── Connie (chatbot simple basado en reglas) ────────────────────────────

@app.route("/api/connie", methods=["POST"])
def connie_api():
    data = request.get_json() or {}
    reply = connie_bot.get_reply(data.get("message", ""))
    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
