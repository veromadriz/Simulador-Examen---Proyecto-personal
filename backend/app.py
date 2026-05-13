import os
from pathlib import Path
from flask import Flask, jsonify, request, render_template, send_from_directory
from db import get_connection

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
STATIC_DIR = ROOT_DIR / "static"
TEMPLATES_DIR = ROOT_DIR / "templates"
FRONTEND_DIR = ROOT_DIR / "frontend"

app = Flask(
    __name__,
    static_folder=str(STATIC_DIR),
    template_folder=str(TEMPLATES_DIR),
)

# CORS opcional si está instalado flask_cors
try:
    from flask_cors import CORS
    CORS (app, resources={r"/api/*": {"origins": "*"}, r"/login": {"origins": "*"}, r"/register": {"origins": "*"}})
except ImportError:
    pass

@app.route("/")
def home():
    return send_from_directory(str(FRONTEND_DIR), "index.html")

@app.route("/<path:filename>")
def frontend_pages(filename):
    if filename.endswith(".html"):
        return send_from_directory(str(FRONTEND_DIR), filename)
    return app.send_static_file(filename)

@app.route("/api/examen/questions")
def get_questions():
    exam_type = request.args.get("type", "random")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id_pregunta, enunciado
        FROM preguntas
        ORDER BY RANDOM()
        LIMIT 10
    """)

    questions = []

    for id_pregunta, enunciado in cursor.fetchall():
        cursor.execute("""
            SELECT id_opcion, texto
            FROM opciones
            WHERE id_pregunta = %s
        """, (id_pregunta,))

        opciones = [
            {
                "id_opcion": id_opcion,
                "texto": texto
            }
            for id_opcion, texto in cursor.fetchall()
        ]

        questions.append({
            "id_pregunta": id_pregunta,
            "enunciado": enunciado,
            "opciones": opciones
        })

    cursor.close()
    conn.close()

    return jsonify(questions)

@app.route("/api/examen/stats")
def get_stats():
    return jsonify({
        "examenes": 0,
        "promedio": 0,
        "temas": 0
    })


@app.route('/examen')
def exam_page():
    return render_template('examen.html')

@app.route('/resultados')
def results_page():
    return render_template('resultados.html')

@app.route('/category-selection')
def category_selection_page():
    return render_template('category_selection.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id_usuario, nombre, contrasena FROM usuarios WHERE email = %s",
        (email,)
    )

    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user and user[2].strip() == (password or '').strip():
        return jsonify({
    "success": True,
    "id_usuario": user[0],
    "nombre": user[1]
})

    return jsonify({
        "success": False,
        "message": "Credenciales incorrectas"
    }), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    nombre = data.get('nombre')
    email = data.get('email')
    password = data.get('password')

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT 1 FROM usuarios WHERE email = %s",
        (email,)
    )
    existing = cursor.fetchone()

    if existing:
        cursor.close()
        conn.close()
        return jsonify({
            "success": False,
            "message": "El usuario ya existe"
        }), 409

    cursor.execute(
        "INSERT INTO usuarios (nombre, email, contrasena) VALUES (%s, %s, %s)",
        (nombre, email, password)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Usuario creado correctamente"
    })

# ─── PEGA ESTO EN app.py ───────────────────────────────────────────────────

import json, re, unicodedata, random
from pathlib import Path

# Carga el JSON de Connie una sola vez al arrancar
_CONNIE_JSON = ROOT_DIR / "connie.json"  # pon connie.json en la raíz del proyecto

def _load_kb():
    if _CONNIE_JSON.exists():
        with open(_CONNIE_JSON, "r", encoding="utf-8") as f:
            return json.load(f).get("knowledge_base", {})
    return {}

_KB = _load_kb()

def _preprocess(text):
    text = text.lower()
    text = unicodedata.normalize('NFD', text)
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    text = re.sub(r'[^a-z0-9\s]', '', text)
    return text.split()

def _get_best_response(user_input):
    user_words = _preprocess(user_input)
    best_score, best_answer = 0, None

    for topic, entries in _KB.items():
        if topic == "meta":
            continue
        for entry in entries:
            for pattern in entry.get("patterns", []):
                common = set(user_words) & set(_preprocess(pattern))
                score = len(common)
                if score > best_score:
                    best_score = score
                    best_answer = entry["answer"]

    if best_score == 0:
        return "Mmm… no te entendí bien 😅 ¿me lo dices de otra forma?"
    return best_answer

def _add_personality(response):
    friendly = ["¡Hey! 💛 ", "¡Te ayudo! 😊 ", "Tranqui, mira: ", "Todo bien, aquí va: "]
    sassy    = ["Mira… 😏 ", "No es por nada pero 😌 ", "Te lo dejo fácil: ", "Ajá… importante: "]
    prefix = random.choice(sassy) if random.random() < 0.4 else random.choice(friendly)
    return prefix + response

@app.route('/connie')
def connie_page():
    return send_from_directory(str(FRONTEND_DIR), 'connie.html')

@app.route('/api/connie', methods=['POST'])
def connie_api():
    data = request.get_json() or {}
    user_msg = data.get('message', '')
    raw = _get_best_response(user_msg)
    reply = _add_personality(raw)
    return jsonify({"reply": reply})

# ────────────────────────────────────────────────────────────────────────────
@app.route('/guardar_resultado', methods=['POST'])
def guardar_resultado():
    print(">>> guardar_resultado fue llamado")
    data = request.get_json() or {}

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO intentos_examen
        (id_usuario, id_examen, tipo_generado, puntaje, aprobado)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id_intento
    """, (
        data["id_usuario"],
        data["id_examen"],
        data.get("tipo_generado", "normal"),
        data["puntaje"],
        data["aprobado"]
    ))

    id_intento = cursor.fetchone()[0]

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "id_intento": id_intento
    })

@app.route('/estadisticas/<int:id_usuario>')
def obtener_estadisticas(id_usuario):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            COUNT(*),
            COALESCE(MAX(puntaje), 0),
            COALESCE(AVG(puntaje), 0)
        FROM intentos_examen
        WHERE id_usuario = %s
    """, (id_usuario,))

    total_examenes, mejor_nota, promedio = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify({
        "total_examenes": total_examenes,
        "mejor_nota": round(float(mejor_nota), 1),
        "promedio": round(float(promedio), 1)
    })


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)

