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

@app.route("/api/examen/categorias")
def get_categorias():
    """Categorías con preguntas disponibles, para 'Practicar por categoría'."""
    with get_cursor() as cur:
        cur.execute(
            """
            SELECT categoria, COUNT(*) AS total
            FROM preguntas
            WHERE categoria IS NOT NULL AND categoria <> ''
            GROUP BY categoria
            ORDER BY categoria
            """
        )
        rows = cur.fetchall()

    return jsonify([{"categoria": categoria, "total_preguntas": total} for categoria, total in rows])


@app.route("/api/examen/questions")
def get_questions():
    exam_type = request.args.get("type", "random")
    categoria = request.args.get("categoria")

    with get_cursor() as cur:
        if exam_type == "category" and categoria:
            cur.execute(
                """
                SELECT id_pregunta, enunciado
                FROM preguntas
                WHERE categoria = %s
                ORDER BY RANDOM()
                LIMIT 10
                """,
                (categoria,),
            )
        else:
            cur.execute(
                """
                SELECT id_pregunta, enunciado
                FROM preguntas
                ORDER BY RANDOM()
                LIMIT 10
                """
            )

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

    total = len(respuestas)
    correctas = 0

    with get_cursor() as cur:
        for respuesta in respuestas:
            id_pregunta = respuesta.get("id_pregunta")
            id_opcion = respuesta.get("id_opcion")

            if id_pregunta is None or id_opcion is None:
                continue

            cur.execute(
                """
                SELECT es_correcta
                FROM opciones
                WHERE id_pregunta = %s AND id_opcion = %s
                """,
                (id_pregunta, id_opcion),
            )
            row = cur.fetchone()
            if row and row[0]:
                correctas += 1

    puntaje = round((correctas / total) * 100, 1) if total else 0
    aprobado = puntaje >= PASSING_SCORE

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

    return jsonify({
        "success": True,
        "id_intento": id_intento,
        "correctas": correctas,
        "total": total,
        "puntaje": puntaje,
        "aprobado": aprobado,
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

    return jsonify({
        "total_examenes": total_examenes,
        "mejor_nota": round(float(mejor_nota), 1),
        "promedio": round(float(promedio), 1),
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
