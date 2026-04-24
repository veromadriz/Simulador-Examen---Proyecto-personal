from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# permitir conexión desde frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))

@app.post("/login")
hgadef login(data: dict):
    email = data.get("email")
    password = data.get("contrasenia")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id_usuario, nombre FROM usuarios WHERE email = %s AND contrasena = %s",
        (email, password)
    )

    user = cursor.fetchone()

    conn.close()

    if user:
        return {
            "success": True,
            "nombre": user[1]
        }
    else:
        return {"success": False, "message": "Información inválida, intenta de nuevo"}