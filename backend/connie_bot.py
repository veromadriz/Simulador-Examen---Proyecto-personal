"""
connie_bot.py
-------------
Chatbot simple basado en reglas para "Connie", el asistente de DrivePrep.

Antes esta lógica estaba duplicada en tres lugares (backend/connie.py,
connie/connie.py y directamente pegada dentro de app.py). Ahora vive en
un único módulo importable para que no se desincronicen entre sí.

Uso:
    from connie_bot import get_reply
    reply = get_reply("¿qué significa la señal de alto?")
"""

import json
import random
import re
import unicodedata
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
CONNIE_JSON_PATH = ROOT_DIR / "connie.json"

FRIENDLY_PREFIXES = [
    "¡Hey! 💛 ",
    "¡Te ayudo! 😊 ",
    "Tranqui, mira: ",
    "Todo bien, aquí va: ",
]

SASSY_PREFIXES = [
    "Mira… 😏 ",
    "No es por nada pero 😌 ",
    "Te lo dejo fácil: ",
    "Ajá… importante: ",
]

FALLBACK_ANSWER = "Mmm… no te entendí bien 😅 ¿me lo dices de otra forma?"

_SASSY_PROBABILITY = 0.4


def _load_knowledge_base(path: Path = CONNIE_JSON_PATH) -> dict:
    if not path.exists():
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f).get("knowledge_base", {})


# Se carga una sola vez al importar el módulo.
_KNOWLEDGE_BASE = _load_knowledge_base()


def _normalize(text: str) -> list[str]:
    text = text.lower()
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^a-z0-9\s]", "", text)
    return text.split()


def _best_match(user_input: str) -> str:
    user_words = set(_normalize(user_input))
    best_score, best_answer = 0, None

    for topic, entries in _KNOWLEDGE_BASE.items():
        if topic == "meta":
            continue
        for entry in entries:
            for pattern in entry.get("patterns", []):
                score = len(user_words & set(_normalize(pattern)))
                if score > best_score:
                    best_score = score
                    best_answer = entry.get("answer")

    return best_answer if best_score > 0 else FALLBACK_ANSWER


def _with_personality(response: str) -> str:
    prefix = random.choice(
        SASSY_PREFIXES if random.random() < _SASSY_PROBABILITY else FRIENDLY_PREFIXES
    )
    return prefix + response


def get_reply(user_message: str) -> str:
    """Devuelve la respuesta final de Connie (con personalidad) para un mensaje dado."""
    if not user_message or not user_message.strip():
        return FALLBACK_ANSWER
    return _with_personality(_best_match(user_message))


if __name__ == "__main__":
    print("Connie 🚗✨: ¡Hola! Soy Connie, tu copiloto del examen. ¿Qué quieres saber? (escribe 'salir' para terminar)")
    while True:
        user_input = input("Tú: ")
        if user_input.strip().lower() in {"salir", "exit", "bye"}:
            print("Connie: ¡Bye! Maneja bonito 💛")
            break
        print("Connie:", get_reply(user_input))
