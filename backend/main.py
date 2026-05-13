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

    from fastapi import Body

@app.post("/guardar_resultado")
def guardar_resultado(data: dict = Body(...)):
    conn = get_connection()
    cursor = conn.cursor()

    id_usuario = data["id_usuario"]
    id_examen = data["id_examen"]
    tipo_generado = data.get("tipo_generado", "normal")
    puntaje = data["puntaje"]
    aprobado = data["aprobado"]

    cursor.execute("""
        INSERT INTO intentos_examen
        (id_usuario, id_examen, tipo_generado, puntaje, aprobado)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id_intento
    """, (
        id_usuario,
        id_examen,
        tipo_generado,
        puntaje,
        aprobado
    ))

    id_intento = cursor.fetchone()[0]

    conn.commit()
    conn.close()

    return {
        "success": True,
        "id_intento": id_intento
    }

@app.get("/estadisticas/{id_usuario}")
def obtener_estadisticas(id_usuario: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            COUNT(*),
            COALESCE(MAX(puntaje), 0),
            COALESCE(AVG(puntaje), 0)
        FROM intentos_examen
        WHERE id_usuario = %s
        """,
        (id_usuario,)
    )

    total_examenes, mejor_nota, promedio = cursor.fetchone()

    conn.close()

    return {
        "total_examenes": total_examenes,
        "mejor_nota": round(float(mejor_nota), 1),
        "promedio": round(float(promedio), 1)
    }

@app.get("/ultimo_resultado/{id_usuario}")
def obtener_ultimo_resultado(id_usuario: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            i.puntaje,
            i.aprobado,
            i.fecha,
            e.titulo
        FROM intentos_examen i
        JOIN examenes e ON i.id_examen = e.id_examen
        WHERE i.id_usuario = %s
        ORDER BY i.fecha DESC
        LIMIT 1
        """,
        (id_usuario,)
    )

    resultado = cursor.fetchone()
    conn.close()

    if not resultado:
        return {"success": False}

    return {
        "success": True,
        "puntaje": float(resultado[0]),
        "aprobado": bool(resultado[1]),
        "fecha": str(resultado[2]),
        "titulo_examen": resultado[3]
    }