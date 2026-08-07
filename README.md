# DrivePrep 🚗

Aplicación web para prepararse para el examen teórico de manejo de Costa Rica:
simulacros de examen, calificación automática, historial de resultados,
chatbot de práctica y un manual del conductor navegable.

## Tecnologías

- **Backend:** Python, Flask, psycopg2, Werkzeug (hash de contraseñas)
- **Base de datos:** PostgreSQL (Supabase)
- **Frontend:** React + Vite + React Router
- **Chatbot Connie:** Groq (`openai/gpt-oss-120b`) con contexto bilingüe
  del Manual.

## Cómo correrlo

1. Clonar el repositorio y crear un entorno virtual de Python:
   ```
   python -m venv venv
   venv\Scripts\activate   # Windows
   source venv/bin/activate  # macOS/Linux
   pip install -r requirements.txt
   ```

2. Configurar la base de datos:
   - Crear un proyecto en Supabase.
   - Poner la cadena de conexión en un archivo `.env` en la raíz:
     ```
     DATABASE_URL=postgresql://usuario:password@host:puerto/postgres
     ```
   - Correr `migrations/001_categorias_y_manual.sql` en el SQL Editor de
     Supabase (agrega columna de categoría + tablas del manual).
   - Para activar gratis la versión inteligente de Connie, creá una clave
     nueva en Groq y agregá:
     ```
     GROQ_API_KEY=tu-api-key-nueva
     ```
     No reutilicés la clave incluida en prototipos viejos. Opcionalmente podés
     cambiar el modelo con `GROQ_MODEL` o usar `ANTHROPIC_API_KEY` como segundo
     proveedor.

3. Instalar y compilar el frontend:
   ```
   cd react-frontend
   npm install
   npm run build
   ```
   (En desarrollo podés usar `npm run dev` en su lugar y dejar el backend
   corriendo aparte en `http://127.0.0.1:5000`.)

4. Ejecutar el backend:
   ```
   cd backend
   python app.py
   ```

5. Abrir `http://127.0.0.1:5000`.

## Estructura del proyecto

```
Simulador-Examen---Proyecto-personal/
├── backend/
│   ├── app.py             # rutas principales (Flask)
│   ├── db.py               # conexión a Postgres
│   ├── auth_utils.py        # hash/verificación de contraseñas
│   ├── connie_bot.py        # lógica del chatbot Connie (única copia)
│   └── manual_routes.py     # blueprint del Manual + chatbot Groq/Claude
├── migrations/
│   └── 001_categorias_y_manual.sql
├── react-frontend/          # frontend en React + Vite
├── static/assets/            # logo y assets estáticos servidos por Flask
├── connie.json               # base de conocimiento de Connie
└── requirements.txt
```

## Limitaciones conocidas / próximos pasos

- El login no usa sesiones de servidor (cookies firmadas / JWT); el
  frontend guarda el usuario en `localStorage`. Funciona para un proyecto
  personal, pero si esto va a producción real conviene agregar sesiones o
  tokens con expiración.
- La categoría de las preguntas es un campo de texto libre; si querés un
  set fijo de categorías con validación, conviene convertirlo en una tabla
  `categorias` con clave foránea.
- Connie usa `/api/manual/chat` cuando `GROQ_API_KEY` (preferida) o
  `ANTHROPIC_API_KEY` está configurada. Sin esas variables, la interfaz cambia
  automáticamente al bot local basado en reglas, por lo que el chat sigue
  funcionando con respuestas limitadas.

✨ Proyecto desarrollado por Verónica Madriz como proyecto personal para
practicar desarrollo web full stack y crear una herramienta de apoyo para
estudiantes del examen teórico de manejo en Costa Rica.
