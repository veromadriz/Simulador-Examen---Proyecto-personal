import psycopg2

conn = psycopg2.connect(
    "postgresql://postgres:[simuladorsot3!]@db.biunrmibqotirmybywha.supabase.co:5432/postgres"
)

cursor = conn.cursor()

# probar consulta
cursor.execute("SELECT * FROM usuarios;")

usuarios = cursor.fetchall()

for u in usuarios:
    print(u)

conn.close()