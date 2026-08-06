"""Importa el resumen COSEVI al Manual y clasifica preguntas por capítulo.

Ejemplo:
    python backend/import_cosevi_manual.py "C:\\ruta\\Resumen COSEVI.json" \
        --replace-manual --assign-questions

Antes de ejecutarlo, aplicá migrations/001_categorias_y_manual.sql y
migrations/002_capitulos_cosevi.sql en Supabase.
"""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from pathlib import Path

from db import get_connection


CHAPTERS = {
    1: ("Aspectos generales del tránsito y la seguridad vial", "🚦"),
    2: ("Legislación de tránsito", "⚖️"),
    3: ("Factor vía y su entorno", "🛣️"),
    4: ("Factor vehículo", "🚗"),
    5: ("Factor humano", "🧑"),
    6: ("Normas de circulación", "🚸"),
    7: ("Rotondas", "🔄"),
    8: ("El conductor y la contaminación ambiental", "🌿"),
    9: ("La conducción técnica económica eficiente", "⛽"),
    10: ("La conducción en motocicleta", "🏍️"),
}

CATEGORY_CHAPTERS = {
    "signals": 3, "senales": 3, "signs": 3, "via": 3, "road": 3,
    "rules": 6, "circulacion": 6, "circulation": 6,
    "safety": 1, "seguridad": 1, "general": 1,
    "legislacion": 2, "ley": 2, "multas": 2,
    "vehicle": 4, "vehiculo": 4,
    "human": 5, "humano": 5,
    "roundabout": 7, "rotonda": 7,
    "environment": 8, "ambiental": 8, "contaminacion": 8,
    "eco": 9, "efficiency": 9, "eficiente": 9,
    "motorcycle": 10, "motocicleta": 10, "moto": 10,
}

# Las reglas específicas se evalúan antes que las generales. Sirven como una
# ayuda inicial: toda pregunta que no coincida queda sin asignar para revisión.
QUESTION_RULES = [
    (10, ("motocicleta", "motociclista", "casco", "manivela", "estribo")),
    (9, ("eco-conduccion", "combustible", "ahorro de combustible", "conduccion eficiente")),
    (8, ("contaminacion", "emision", "co2", "medio ambiente", "ambiental")),
    (7, ("rotonda", "rotatoria", "isleta central")),
    (5, ("factor humano", "fatiga", "somnolencia", "alcohol", "estupefaciente", "psicotrop")),
    (4, ("parabrisas", "retrovisor", "llanta", "neumatico", "freno", "motor", "vehiculo")),
    (2, ("ley 9078", "multa", "infraccion", "sancion", "marchamo", "rtv", "derecho de circulacion")),
    (3, ("senal", "semaforo", "demarcacion", "carretera", "via publica", "calzada")),
    (6, ("peaton", "adelantamiento", "carril", "interseccion", "paso peatonal", "limite de velocidad")),
    (1, ("seguridad vial", "trilogia vial", "accidente de transito")),
]


def fix_text(value: str) -> str:
    """Corrige texto UTF-8 que llegó con mojibake desde la exportación OCR."""
    value = " ".join((value or "").split())
    if "Ã" in value or "â" in value:
        try:
            return value.encode("latin-1").decode("utf-8")
        except UnicodeError:
            pass
    return value


def normalize(value: str) -> str:
    value = fix_text(value).lower()
    return "".join(char for char in unicodedata.normalize("NFD", value) if unicodedata.category(char) != "Mn")


def section_title(key: str) -> str:
    """Turns JSON keys into friendly manual headings."""
    return fix_text(key.replace("_", " ")).capitalize()


def format_value(value) -> str:
    """Keeps the source hierarchy while making the manual easy to scan."""
    if isinstance(value, str):
        return fix_text(value)
    if isinstance(value, list):
        parts = []
        for item in value:
            rendered = format_value(item)
            if rendered:
                parts.append(f"• {rendered}")
        return "\n".join(parts)
    if isinstance(value, dict):
        parts = []
        for key, item in value.items():
            rendered = format_value(item)
            if rendered:
                parts.append(f"{section_title(key)}: {rendered}")
        return "\n".join(parts)
    return str(value)


def structured_manual_sections(source) -> dict[int, list[tuple[str, str]]]:
    """Reads the newer JSON format where every top-level item is a chapter."""
    chapters = {}
    if not isinstance(source, list):
        return chapters

    for chapter in source:
        if not isinstance(chapter, dict):
            continue
        match = re.search(r"(10|[1-9])", str(chapter.get("chapter", "")))
        if not match:
            continue
        number = int(match.group(1))
        sections = []
        for key, value in chapter.items():
            if key not in {"chapter", "title"}:
                content = format_value(value)
                if content:
                    sections.append((section_title(key), content))
        chapters[number] = sections
    return chapters


def manual_text_by_chapter(source: dict) -> dict[int, list[str]]:
    chapters = {number: [] for number in CHAPTERS}
    current_chapter = None
    heading = re.compile(r"^capitulo\s+(10|[1-9])\b", re.IGNORECASE)

    for page in source.get("pages", []):
        for block in page.get("content", []):
            text = fix_text(block.get("text", ""))
            if not text or text.startswith("ICP DE SAN RAMON") or text.startswith("CLASES TEORICAS"):
                continue
            if re.fullmatch(r"Page \d+ of \d+", text, flags=re.IGNORECASE):
                continue

            match = heading.match(text)
            if match:
                current_chapter = int(match.group(1))
            if current_chapter in chapters:
                chapters[current_chapter].append(text)

    return chapters


def chunks(texts: list[str], limit: int = 2800) -> list[str]:
    result, current = [], ""
    for text in texts:
        if len(text) > limit:
            text = text[:limit].rsplit(" ", 1)[0] + "…"
        candidate = f"{current}\n\n{text}" if current else text
        if current and len(candidate) > limit:
            result.append(current)
            current = text
        else:
            current = candidate
    if current:
        result.append(current)
    return result


def upsert_chapters(cur) -> dict[int, int]:
    for number, (title, icon) in CHAPTERS.items():
        cur.execute(
            """
            INSERT INTO manual_capitulos (numero, titulo, descripcion, icono)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (numero) DO UPDATE SET titulo = EXCLUDED.titulo, icono = EXCLUDED.icono
            """,
            (number, title, f"Capítulo {number} del resumen teórico COSEVI.", icon),
        )
    cur.execute("SELECT id, numero FROM manual_capitulos WHERE numero BETWEEN 1 AND 10")
    return {number: chapter_id for chapter_id, number in cur.fetchall()}


def replace_manual(cur, chapter_ids: dict[int, int], source: dict) -> None:
    structured_content = structured_manual_sections(source)
    if structured_content:
        # The new source contains chapters 1–9. Keep the motorcycle chapter
        # already in the Manual because the source does not include chapter 10.
        for number, sections in structured_content.items():
            chapter_id = chapter_ids.get(number)
            if not chapter_id:
                continue
            cur.execute("DELETE FROM manual_secciones WHERE capitulo_id = %s", (chapter_id,))
            for index, (subtitle, content) in enumerate(sections, start=1):
                cur.execute(
                    """
                    INSERT INTO manual_secciones (capitulo_id, orden, subtitulo, contenido)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (chapter_id, index, subtitle, content),
                )
        return

    content = manual_text_by_chapter(source)
    for number, chapter_id in chapter_ids.items():
        cur.execute("DELETE FROM manual_secciones WHERE capitulo_id = %s", (chapter_id,))
        for index, section in enumerate(chunks(content[number]), start=1):
            cur.execute(
                """
                INSERT INTO manual_secciones (capitulo_id, orden, subtitulo, contenido)
                VALUES (%s, %s, %s, %s)
                """,
                (chapter_id, index, f"Resumen del capítulo {number} · parte {index}", section),
            )


def detect_chapter(category: str | None, question: str) -> int | None:
    normalized_category = normalize(category or "")
    if normalized_category in CATEGORY_CHAPTERS:
        return CATEGORY_CHAPTERS[normalized_category]
    normalized_question = normalize(question)
    for chapter, keywords in QUESTION_RULES:
        if any(keyword in normalized_question for keyword in keywords):
            return chapter
    return None


def assign_questions(cur, chapter_ids: dict[int, int]) -> tuple[int, int]:
    cur.execute(
        """
        SELECT id_pregunta, enunciado, categoria
        FROM preguntas
        WHERE capitulo_id IS NULL
        """
    )
    assigned = 0
    unassigned = 0
    for question_id, question, category in cur.fetchall():
        chapter_number = detect_chapter(category, question)
        if chapter_number:
            cur.execute(
                "UPDATE preguntas SET capitulo_id = %s WHERE id_pregunta = %s",
                (chapter_ids[chapter_number], question_id),
            )
            assigned += 1
        else:
            unassigned += 1
    return assigned, unassigned


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("json_file", type=Path, help="Archivo JSON exportado del resumen COSEVI")
    parser.add_argument("--replace-manual", action="store_true", help="Reemplaza las secciones actuales con el contenido del JSON")
    parser.add_argument("--assign-questions", action="store_true", help="Asigna preguntas sin capítulo según categoria y palabras clave")
    args = parser.parse_args()

    if not args.json_file.is_file():
        parser.error(f"No se encontró el archivo: {args.json_file}")
    with args.json_file.open(encoding="utf-8") as file:
        source = json.load(file)

    with get_connection() as connection, connection.cursor() as cur:
        chapter_ids = upsert_chapters(cur)
        if args.replace_manual:
            replace_manual(cur, chapter_ids, source)
        if args.assign_questions:
            assigned, unassigned = assign_questions(cur, chapter_ids)
            print(f"Preguntas asignadas automáticamente: {assigned}. Pendientes de revisión: {unassigned}.")

    print("Importación terminada.")


if __name__ == "__main__":
    main()
