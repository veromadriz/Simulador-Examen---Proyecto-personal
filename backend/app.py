from flask import Flask, jsonify, request
from db import get_connection

app = Flask(__name__)

@app.route("/")
def home():
    return "DrivePrep funcionando 🚗✨"

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

if __name__ == "__main__":
    app.run(debug=True)

    from flask import render_template

@app.route('/examen')
def exam_page():
    return render_template('examen.html')

@app.route('/resultados')
def results_page():
    return render_template('resultados.html')