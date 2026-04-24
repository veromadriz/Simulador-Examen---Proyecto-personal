import psycopg2
from dotenv import load_dotenv
import os

# cargar variables del .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

try:
    # intentar conexión
    connection = psycopg2.connect(DATABASE_URL)
    print("✅ Conexión exitosa")

    cursor = connection.cursor()

    # prueba simple
    cursor.execute("SELECT * FROM usuarios;")
    usuarios = cursor.fetchall()

    print("📦 Usuarios encontrados:")
    for u in usuarios:
        print(u)

    # cerrar conexión
    cursor.close()
    connection.close()
    print("🔌 Conexión cerrada correctamente")

except Exception as e:
    print("❌ Error al conectar:")
    print(e)