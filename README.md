DrivePrep – Documento Principal del Proyecto 🚗

🚗 Descripción general del sistema
DrivePrep es una aplicación web diseñada para ayudar a los usuarios a prepararse para el examen teórico de manejo de Costa Rica. 
El sistema ofrece simulacros de examen con preguntas de selección única, calificación automática y retroalimentación inmediata al finalizar cada intento.
La plataforma permite a los usuarios registrarse, iniciar sesión y realizar exámenes prácticos con preguntas almacenadas en una base de datos. Además, guarda el historial de intentos y estadísticas de rendimiento, lo que facilita identificar fortalezas y áreas de mejora.
El objetivo principal del sistema es brindar una herramienta accesible, intuitiva y visualmente atractiva para que cualquier persona pueda estudiar y practicar de manera efectiva antes de presentar el examen oficial de licencia.

🚗 Objetivo del proyecto
Desarrollar una plataforma web interactiva que permita a los usuarios:

Practicar con preguntas similares a las del examen teórico de manejo.
Obtener resultados automáticos al finalizar cada simulacro.
Revisar su desempeño y monitorear su progreso.
Estudiar de forma flexible desde cualquier dispositivo con acceso a internet.
El proyecto también busca aplicar conocimientos de desarrollo web full stack, incluyendo backend, frontend, bases de datos y autenticación de usuarios.

🚗 Tecnologías utilizadas
- Backend
- Python
- Flask
- SQLAlchemy
- Flask-Login
- Werkzeug
- Base de datos
- MySQL
- Frontend
- HTML5
- CSS3
- JavaScript
- Herramientas de desarrollo
- Git
- GitHub
- Visual Studio Code

🚗 Estructura general del proyecto
DrivePrep/
│── app/
│   ├── __init__.py
│   ├── routes.py
│   ├── models.py
│   ├── forms.py
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── img/
│   └── templates/
│       ├── base.html
│       ├── index.html
│       ├── login.html
│       ├── register.html
│       ├── quiz.html
│       └── result.html
│
│── sql/
│   └── driveprep.sql
│
│── requirements.txt
│── README.md
│── run.py

🚗 Funcionalidades principales
- Registro e inicio de sesión de usuarios.
- Simulacros de examen con preguntas aleatorias.
- Calificación automática.
- Retroalimentación inmediata con puntaje y respuestas correctas.
- Historial de resultados.
- Interfaz responsiva y amigable.

🚗Instrucciones para ejecutar el sistema
1. Clonar el repositorio
git clone https://github.com/veromadriz/Simulador-Examen---Proyecto-personal.git
cd Simulador-Examen---Proyecto-personal

3. Crear y activar un entorno virtual
Windows
python -m venv venv
venv\Scripts\activate

4. Instalar dependencias
pip install -r requirements.txt

5. Configurar la base de datos
Crear una base de datos en Supabase
Copiar el contenido del archivo "DrivePrepDB" en el SQL Editor de Supabase
Verificar que el archivo de configuración del proyecto contenga las credenciales correctas de Supabase.

6. Ejecutar la aplicación
python app.py

7. Abrir en el navegador
http://127.0.0.1:5000

🚗 Requisitos del sistema
requirements.txt en la carpeta del proyecto

✨Proyecto desarrollado por Verónica Madriz como proyecto personal para practicar desarrollo web full stack y crear una herramienta de apoyo para estudiantes del examen teórico de manejo en Costa Rica.
