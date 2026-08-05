import os
from contextlib import contextmanager

import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL no definido en el entorno. Revisa tu archivo .env o la variable de entorno."
    )


def get_connection():
    """Devuelve una conexión nueva a la base de datos (psycopg2)."""
    return psycopg2.connect(DATABASE_URL)


@contextmanager
def get_cursor(commit: bool = False):
    """
    Context manager que abre conexión + cursor, y los cierra siempre
    (incluso si hay una excepción), evitando conexiones colgadas.

    Uso:
        with get_cursor() as cur:
            cur.execute("SELECT ...")
            rows = cur.fetchall()

        with get_cursor(commit=True) as cur:
            cur.execute("INSERT ...")
    """
    conn = get_connection()
    try:
        cur = conn.cursor()
        try:
            yield cur
            if commit:
                conn.commit()
        finally:
            cur.close()
    finally:
        conn.close()
