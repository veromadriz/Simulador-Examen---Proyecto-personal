# DrivePrep 🚗

Aplicación web para prepararse para el examen teórico de manejo de Costa Rica:
simulacros de examen, calificación automática, historial de resultados,
chatbot de práctica y un manual del conductor navegable.

## Qué cambió en esta revisión

Este proyecto tenía bastante código duplicado y algunas funciones que
parecían existir pero en realidad no hacían nada. Este pase de limpieza:

**Se eliminó (código muerto/duplicado):**
- `backend/main.py`: una segunda implementación completa en FastAPI que no
  se usaba (el punto de entrada real es `backend/app.py` con Flask).
- `backend/test.py`: script de prueba roto (usaba `cursor` fuera del bloque
  donde se creaba).
- `backend/connie.py` + la carpeta `connie/` (duplicado exacto) + el bloque
  de código de Connie pegado dentro de `app.py`: las tres copias del mismo
  chatbot ahora viven en un solo lugar, `backend/connie_bot.py`.
- `frontend/`, `templates/` y `static/js/*.js` (`examen.js`, `examenes.js`,
  `login.js`, `react-app.js`): la versión vieja en HTML/JS plano, ya
  reemplazada por completo por `react-frontend/`. Además, el backend tenía
  una ruta `/connie` que por error mostraba la versión vieja en lugar de la
  de React al recargar la página.
- Un repositorio git anidado dentro de `backend/.git` (probablemente un
  `git init` accidental).
- `react-frontend/dist/` (build viejo) y `react-frontend/node_modules/`
  ya no se versionan: son artefactos que se regeneran con `npm install` /
  `npm run build` y no deberían vivir en el repo (además, si los instalás
  en Windows y los copiás a Linux, o viceversa, se rompen — como pasó acá).

**Se arregló (funcionalidad real):**
- **La calificación del examen era falsa.** El endpoint de preguntas nunca
  mandaba cuál opción era correcta, así que el frontend "calificaba"
  contando cuántas preguntas habías *respondido*, no cuántas habías
  *acertado* (había hasta un comentario en el código viejo admitiéndolo).
  Ahora el frontend manda tus respuestas crudas a `/guardar_resultado`, y el
  backend calcula el puntaje real consultando `opciones.es_correcta`. Así
  tampoco se puede hacer trampa leyendo la respuesta correcta desde las
  devtools del navegador, porque nunca se envía al cliente.
- **"Practicar por categoría" no filtraba nada.** Ahora `preguntas` tiene una
  columna `categoria`, hay un endpoint `GET /api/examen/categorias` que
  devuelve las categorías reales con preguntas disponibles, y la pantalla de
  selección de categoría ya no es una lista hardcodeada: se llena con datos
  reales y filtra las preguntas del examen por esa categoría.
- **El Manual ahora es su propia mini-app**, con una página por capítulo
  (`/manual` lista los capítulos, `/manual/:id` muestra su contenido), en vez
  de tres tarjetas de texto fijo. Usa el blueprint `manual_routes.py` que ya
  existía pero nunca se registraba en `app.py`.
- **Contraseñas en texto plano.** Se guardaban y comparaban tal cual en la
  base de datos. Ahora se hashean con Werkzeug (PBKDF2). Las cuentas viejas
  con contraseña en texto plano se siguen reconociendo (para no romper el
  login de nadie) y se migran a un hash seguro automáticamente la primera
  vez que ese usuario inicia sesión con éxito.
- `requirements.txt` estaba vacío. Ahora lista las dependencias reales.

**Si tenés preguntas ya cargadas en tu base de datos**, corré la migración
`migrations/001_categorias_y_manual.sql` en el SQL Editor de Supabase: agrega
la columna `categoria` (segura de correr, no borra nada) y crea las tablas
del manual con contenido de ejemplo. El archivo trae, comentados al final,
unos `UPDATE` de ejemplo para asignarle categoría a tus preguntas existentes
según palabras clave del enunciado.

## Tecnologías

- **Backend:** Python, Flask, psycopg2, Werkzeug (hash de contraseñas)
- **Base de datos:** PostgreSQL (Supabase)
- **Frontend:** React + Vite + React Router
- **Chatbot Connie:** Groq (`openai/gpt-oss-120b`) con contexto bilingüe
  del Manual; puede usar Claude como proveedor alternativo y conserva las
  reglas de `connie.json` como respaldo local

## Frontend React

La interfaz vive en `react-frontend/`. Cada pantalla es una ruta de React
(no un HTML separado), y consume las rutas del backend: `/login`,
`/register`, `/api/examen/questions`, `/api/examen/categorias`,
`/guardar_resultado`, `/estadisticas/:id_usuario`, `/api/connie`,
`/api/manual/capitulos`.

En desarrollo, Vite le hace proxy a las llamadas hacia el backend local para
evitar problemas de CORS (ver `react-frontend/vite.config.js`).

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
