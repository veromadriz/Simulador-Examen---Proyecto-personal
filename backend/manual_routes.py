"""
manual_routes.py
----------------
Blueprint de Flask para el Manual del Conductor y el Chatbot.

Agregalo a tu app principal con:
    from manual_routes import manual_bp
    app.register_blueprint(manual_bp, url_prefix="/api")

El chatbot usa Groq cuando GROQ_API_KEY está configurada, Claude como
alternativa opcional y el bot local como respaldo desde el frontend.
"""

import os
import json
import re
from functools import lru_cache
from pathlib import Path

import psycopg2.extras
from flask import Blueprint, jsonify, request

from db import DATABASE_URL

manual_bp = Blueprint("manual", __name__)

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
ENGLISH_MANUAL_PATH = Path(__file__).resolve().parent.parent / "resumen-manual-del-conductor - ingles.json"


HEADING_WORDS = {
    "accidentes": "accidents", "vehiculares": "vehicle", "mas": "most", "frecuentes": "frequent",
    "actitud": "attitude", "positiva": "positive", "al": "at the", "volante": "wheel",
    "adelantamientos": "passing", "aerodinamica": "aerodynamics", "angulo": "angle", "punto": "spot",
    "muerto": "blind", "antecedentes": "background", "anticipacion": "anticipation", "aptitud": "aptitude",
    "habilidad": "skill", "manejo": "driving", "circulacion": "traffic", "colocacion": "placement",
    "cinturon": "seat belt", "seguridad": "safety", "embarazadas": "pregnant women", "como": "how to",
    "cambiar": "change", "llanta": "tire", "llantas": "tires", "concepto": "concept", "conduccion": "driving",
    "economica": "economical", "contaminacion": "pollution", "ambiental": "environmental", "estructura": "structure",
    "vial": "road", "medio": "environment", "ambiente": "", "senales": "signs", "transito": "traffic",
    "senalamiento": "signage", "senal": "sign", "transporte": "transportation", "via": "road", "entorno": "environment",
    "condiciones": "conditions", "climaticas": "weather", "diseno": "design", "salud": "health", "conductor": "driver",
    "vehiculo": "vehicle", "formales": "formal", "tecnicas": "technical", "eficiente": "efficient",
    "inteligente": "smart", "nocturna": "night", "conocimientos": "knowledge", "sociales": "social",
    "control": "control", "gases": "gases", "contaminantes": "pollutants", "gastos": "expenses",
    "curvas": "curves", "caracteristicas": "characteristic", "motor": "engine", "derecho": "right", "diagramacion": "speed layout",
    "velocidades": "speeds", "dispositivos": "devices", "edades": "ages", "distancia": "distance", "parada": "stopping",
    "ciudad": "city", "cambio": "shift", "progresivo": "progressive", "catalizador": "catalytic converter",
    "manometro": "pressure gauge", "tacometro": "tachometer", "elementos": "elements", "fundamentales": "fundamental",
    "principales": "main", "general": "general", "carretera": "highway", "sintesis": "summary", "objetivo": "objective",
    "primordial": "primary", "entendida": "understood", "estacionamiento": "parking", "fuentes": "sources",
    "fuerzas": "forces", "intervienen": "involved", "desplazamiento": "movement", "funcionamiento": "operation",
    "funciones": "functions", "publica": "public", "habitos": "habits", "intersecciones": "intersections",
    "ley": "law", "vigente": "current", "extintores": "fire extinguishers", "defensivo": "defensive",
    "monoxido": "monoxide", "carbono": "carbon", "normas": "rules", "objetivos": "objectives", "presion": "pressure",
    "aire": "air", "prioridad": "priority", "paso": "right of way", "recomendaciones": "recommendations",
    "practicas": "practical", "automovilista": "driver", "reduccion": "reduction", "costos": "costs", "reencauche": "retreading",
    "regla": "rule", "dos": "two", "segundos": "seconds", "intervalo": "interval", "reglas": "rules", "rotonda": "roundabout",
    "revolucion": "engine speed", "rotacion": "rotation", "pasiva": "passive", "seleccion": "selection", "adeacuada": "appropriate",
    "tipo": "type", "operacion": "operation", "horizontal": "horizontal", "luminoso": "light", "vertical": "vertical",
    "informacion": "information", "sensores": "sensors", "sistema": "system", "emisiones": "emissions", "sistemas": "systems",
    "tablero": "dashboard", "pal": "instrument panel", "instrumentos": "instruments", "medidor": "gauge", "tipos": "types",
    "movimientos": "movements", "trilogia": "trilogy", "ventajas": "advantages", "desventajas": "disadvantages",
    "zona": "area", "rural": "rural", "urbana": "urban", "de": "", "del": "", "la": "", "las": "", "los": "",
    "el": "", "en": "in", "para": "for", "por": "by", "una": "a", "un": "a", "y": "and", "o": "or",
}


def _friendly_heading(key):
    words = key.replace("_", " ").strip().split()
    translated = [HEADING_WORDS.get(word.lower(), word) for word in words]
    return " ".join(word for word in translated if word).strip().capitalize()


def _format_manual_value(value):
    if isinstance(value, str):
        return value.strip()
    if isinstance(value, list):
        return "\n".join(f"• {_format_manual_value(item)}" for item in value if item is not None)
    if isinstance(value, dict):
        return "\n".join(
            f"{_friendly_heading(key)}: {_format_manual_value(item)}"
            for key, item in value.items() if item is not None
        )
    return str(value)


@lru_cache(maxsize=1)
def _english_manual():
    with ENGLISH_MANUAL_PATH.open(encoding="utf-8") as source_file:
        source = json.load(source_file)

    chapters = {}
    for index, chapter in enumerate(source, start=1):
        match = re.search(r"\d+", str(chapter.get("chapter", index)))
        number = int(match.group()) if match else index
        sections = [
            {
                "orden": section_index,
                "subtitulo": _friendly_heading(key),
                "contenido": _format_manual_value(value),
            }
            for section_index, (key, value) in enumerate(chapter.items(), start=1)
            if key not in {"chapter", "title"}
        ]
        chapters[number] = {
            "id": number,
            "numero": number,
            "titulo": chapter.get("title", f"Chapter {number}").title(),
            "descripcion": f"Chapter {number} of the Costa Rica Driver's Manual summary.",
            "icono": "📘",
            "total_secciones": len(sections),
            "secciones": sections,
        }
    return chapters


def _english_manual_context(question, limit=4):
    words = {word.lower() for word in re.findall(r"[a-zA-Z]{4,}", question)}
    ranked = []
    for chapter in _english_manual().values():
        for section in chapter["secciones"]:
            searchable = f"{chapter['titulo']} {section['subtitulo']} {section['contenido']}".lower()
            score = sum(searchable.count(word) for word in words)
            if score:
                ranked.append((score, chapter, section))
    ranked.sort(key=lambda item: item[0], reverse=True)
    return "\n\n".join(
        f"[{chapter['titulo']} - {section['subtitulo']}]\n{section['contenido'][:1200]}"
        for _, chapter, section in ranked[:limit]
    )


# ──────────────────────────────────────────────
# UTILIDAD: conexión (con filas como diccionarios)
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
        if request.args.get("lang") == "en":
            chapters = _english_manual().values()
            return jsonify({"ok": True, "capitulos": [
                {key: value for key, value in chapter.items() if key != "secciones"}
                for chapter in chapters
            ]})
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
        if request.args.get("lang") == "en":
            chapter = _english_manual().get(cap_id)
            if not chapter:
                return jsonify({"ok": False, "error": "Chapter not found"}), 404
            return jsonify({"ok": True, "capitulo": chapter})
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
    if not GROQ_API_KEY and not ANTHROPIC_API_KEY:
        return jsonify({"ok": False, "error": "No AI provider is configured."}), 503

    data = request.get_json(silent=True) or {}
    pregunta = (data.get("pregunta") or "").strip()
    historial = data.get("historial") or []  # lista de {role, content}
    language = "en" if data.get("language") == "en" else "es"

    if not pregunta:
        return jsonify({"ok": False, "error": "Falta el campo 'pregunta'"}), 400

    contexto = _english_manual_context(pregunta) if language == "en" else ""
    if language == "es":
        try:
            conn = get_conn()
            palabras = [p for p in pregunta.lower().split() if len(p) > 3]
            if palabras:
                like_clauses = " OR ".join(["LOWER(s.contenido) LIKE %s" for _ in palabras])
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
                    partes = []
                    for row in rows:
                        subtitle = f" - {row['subtitulo']}" if row["subtitulo"] else ""
                        partes.append(f"[{row['titulo']}{subtitle}]\n{row['contenido'][:1200]}")
                    contexto = "\n\n".join(partes)
            conn.close()
        except Exception:
            contexto = ""

    if language == "en":
        system_prompt = """You are Connie, DrivePrep's friendly expert on Costa Rica's Driver's Manual.
Answer clearly and concisely in English. Use the provided manual context as the primary source.
Do not invent traffic laws, fines, limits, or exam facts. If the context does not establish a factual
answer, say so and direct the student to verify it in the official Costa Rica Driver's Manual.
You may also help with study strategies, explain exam questions, and quiz the student when asked."""
        context_label = "RELEVANT DRIVER'S MANUAL CONTEXT"
    else:
        system_prompt = """Sos Connie, la asistente amigable de DrivePrep y experta en el Manual del Conductor de Costa Rica.
Respondé de forma clara, concisa y en español costarricense. Usá el contexto del manual como fuente principal.
No inventés leyes, multas, límites ni datos del examen. Si el contexto no respalda una respuesta factual,
decilo y recomendá verificar el Manual del Conductor oficial. También podés ayudar con técnicas de estudio,
explicar preguntas del examen y hacer preguntas de práctica cuando te lo pidan."""
        context_label = "CONTEXTO RELEVANTE DEL MANUAL"

    if contexto:
        system_prompt += f"\n\n{context_label}:\n{contexto}"

    # Keep a short history to control latency and free-tier token usage.
    mensajes = []
    for msg in historial[-6:]:  # últimos 6 mensajes para no exceder tokens
        if msg.get("role") in ("user", "assistant"):
            mensajes.append({"role": msg["role"], "content": msg["content"]})
    mensajes.append({"role": "user", "content": pregunta})

    try:
        if GROQ_API_KEY:
            from groq import Groq

            client = Groq(api_key=GROQ_API_KEY)
            completion = client.chat.completions.create(
                model=GROQ_MODEL,
                messages=[{"role": "system", "content": system_prompt}, *mensajes],
                max_completion_tokens=500,
                temperature=0.3,
            )
            texto = completion.choices[0].message.content
        else:
            import anthropic

            client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
            respuesta = client.messages.create(
                model="claude-haiku-4-5",
                max_tokens=500,
                system=system_prompt,
                messages=mensajes,
            )
            texto = respuesta.content[0].text
        return jsonify({"ok": True, "respuesta": texto})
    except Exception:
        return jsonify({"ok": False, "error": "Connie AI is temporarily unavailable."}), 502
