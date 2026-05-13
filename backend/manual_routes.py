"""
manual_routes.py
----------------
Blueprint de Flask para el Manual del Conductor y el Chatbot.

Agregalo a tu app principal con:
    from manual_routes import manual_bp
    app.register_blueprint(manual_bp, url_prefix="/api")

Requiere en requirements.txt:
    flask
    psycopg2-binary
    python-dotenv
    anthropic          # para el chatbot (usa la API de Claude)
"""

import os
import psycopg2
import psycopg2.extras
from flask import Blueprint, jsonify, request
from dotenv import load_dotenv

load_dotenv()

manual_bp = Blueprint("manual", __name__)

DATABASE_URL = os.getenv("DATABASE_URL")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")  # agrega esto a tu .env


# ──────────────────────────────────────────────
# UTILIDAD: conexión
# ──────────────────────────────────────────────
def get_conn():
    return psycopg2.connect(DATABASE_URL, cursor_factory=psycopg2.extras.RealDictCursor)


# ──────────────────────────────────────────────
# GET /api/manual/capitulos
# Lista todos los capítulos (sin contenido completo)
# ──────────────────────────────────────────────
@manual_bp.get("/manual/capitulos")
def listar_capitulos():
    try:
        conn = get_conn()
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT
                    c.id,
                    c.numero,
                    c.titulo,
                    c.descripcion,
                    c.icono,
                    COUNT(s.id) AS total_secciones
                FROM manual_capitulos c
                LEFT JOIN manual_secciones s ON s.capitulo_id = c.id
                GROUP BY c.id
                ORDER BY c.numero
                """
            )
            capitulos = cur.fetchall()
        conn.close()
        return jsonify({"ok": True, "capitulos": [dict(c) for c in capitulos]})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# ──────────────────────────────────────────────
# GET /api/manual/capitulos/<id>
# Devuelve un capítulo con todas sus secciones
# ──────────────────────────────────────────────
@manual_bp.get("/manual/capitulos/<int:cap_id>")
def obtener_capitulo(cap_id):
    try:
        conn = get_conn()
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM manual_capitulos WHERE id = %s",
                (cap_id,),
            )
            cap = cur.fetchone()
            if not cap:
                conn.close()
                return jsonify({"ok": False, "error": "Capítulo no encontrado"}), 404

            cur.execute(
                """
                SELECT orden, subtitulo, contenido
                FROM manual_secciones
                WHERE capitulo_id = %s
                ORDER BY orden
                """,
                (cap_id,),
            )
            secciones = cur.fetchall()

        conn.close()
        resultado = dict(cap)
        resultado["secciones"] = [dict(s) for s in secciones]
        return jsonify({"ok": True, "capitulo": resultado})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# ──────────────────────────────────────────────
# POST /api/manual/chat
# Chatbot que responde sobre el manual
# Body: { "pregunta": "...", "historial": [...] }
# ──────────────────────────────────────────────
@manual_bp.post("/manual/chat")
def chat_manual():
    if not ANTHROPIC_API_KEY:
        return jsonify({"ok": False, "error": "ANTHROPIC_API_KEY no configurada"}), 500

    data = request.get_json(silent=True) or {}
    pregunta = (data.get("pregunta") or "").strip()
    historial = data.get("historial") or []  # lista de {role, content}

    if not pregunta:
        return jsonify({"ok": False, "error": "Falta el campo 'pregunta'"}), 400

    # Buscar contexto relevante en la BD (búsqueda simple por palabras clave)
    contexto = ""
    try:
        conn = get_conn()
        palabras = [p for p in pregunta.lower().split() if len(p) > 3]
        if palabras:
            like_clauses = " OR ".join(
                ["LOWER(s.contenido) LIKE %s" for _ in palabras]
            )
            params = [f"%{p}%" for p in palabras]
            with conn.cursor() as cur:
                cur.execute(
                    f"""
                    SELECT c.titulo, s.subtitulo, s.contenido
                    FROM manual_secciones s
                    JOIN manual_capitulos c ON c.id = s.capitulo_id
                    WHERE {like_clauses}
                    LIMIT 4
                    """,
                    params,
                )
                rows = cur.fetchall()
                if rows:
                    partes = []
                    for r in rows:
                        sub = f" — {r['subtitulo']}" if r["subtitulo"] else ""
                        partes.append(f"[{r['titulo']}{sub}]\n{r['contenido'][:500]}")
                    contexto = "\n\n".join(partes)
        conn.close()
    except Exception:
        pass  # Si falla la BD, el chatbot responde igual sin contexto

    # Construir mensajes para Claude
    import anthropic

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    system_prompt = """Sos un asistente amigable y experto en el Manual del Conductor de Costa Rica.
Respondés preguntas de forma clara, precisa y en español costarricense.
Basá tus respuestas en el contexto del manual proporcionado.
Si no encontrás la información exacta en el contexto, indicalo amablemente y
brindá una respuesta general sobre el tema de tránsito en Costa Rica.
Sé conciso pero completo."""

    if contexto:
        system_prompt += f"\n\nCONTEXTO RELEVANTE DEL MANUAL:\n{contexto}"

    # Convertir historial al formato de Anthropic
    mensajes = []
    for msg in historial[-6:]:  # últimos 6 mensajes para no exceder tokens
        if msg.get("role") in ("user", "assistant"):
            mensajes.append({"role": msg["role"], "content": msg["content"]})
    mensajes.append({"role": "user", "content": pregunta})

    try:
        respuesta = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=800,
            system=system_prompt,
            messages=mensajes,
        )
        texto = respuesta.content[0].text
        return jsonify({"ok": True, "respuesta": texto})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500
