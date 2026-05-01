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
def login(data: dict):
    email = data.get("email")
    password = data.get("password")

    conn = get_connection()
    cursor = conn.cursor()

    # Buscar solo por email
    cursor.execute(
        "SELECT id_usuario, nombre, contrasena FROM usuarios WHERE email = %s",
        (email,)
    )

    user = cursor.fetchone()
    conn.close()

    # Debug (puedes quitar luego)
    print("EMAIL:", email)
    print("PASSWORD INGRESADA:", password)
    print("PASSWORD EN DB:", user[2] if user else None)

    # Comparación en Python
    if user and user[2].strip() == password.strip():
        return {
            "success": True,
            "nombre": user[1]
        }
    else:
        return {
            "success": False,
            "message": "Credenciales incorrectas"
        }
    
@app.post("/register")
def register(data: dict):
    nombre = data.get("nombre")
    email = data.get("email")
    password = data.get("password")

    conn = get_connection()
    cursor = conn.cursor()

    # verificar si ya existe
    cursor.execute(
        "SELECT * FROM usuarios WHERE email = %s",
        (email,)
    )
    existing = cursor.fetchone()

    if existing:
        conn.close()
        return {
            "success": False,
            "message": "El usuario ya existe"
        }

    # insertar usuario
    cursor.execute(
        "INSERT INTO usuarios (nombre, email, contrasena) VALUES (%s, %s, %s)",
        (nombre, email, password)
    )
    conn.commit()
    conn.close()

    return {
        "success": True,
        "message": "Usuario creado correctamente"
    }