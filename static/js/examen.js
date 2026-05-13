// static/js/examen.js

const API_BASE =
    window.location.origin && window.location.origin !== "null"
        ? window.location.origin
        : "http://127.0.0.1:5000";

let questions = [];
let currentQuestionIndex = 0;
let answers = {};
let timeRemaining = 300; // 5 minutos
let timerInterval = null;

/**
 * Carga las preguntas desde el backend.
 */
async function loadQuestions() {
    try {
        const examType =
            localStorage.getItem("selectedExamType") || "random";

        const response = await fetch(
            `${API_BASE}/api/examen/questions?type=${examType}`,
            {
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        questions = await response.json();

        if (!Array.isArray(questions) || questions.length === 0) {
            const questionText = document.getElementById("question-text");
            if (questionText) {
                questionText.textContent =
                    "No hay preguntas disponibles.";
            }
            return;
        }

        startTimer();
        renderQuestion();
    } catch (error) {
        console.error("Error cargando preguntas:", error);

        const questionText = document.getElementById("question-text");
        if (questionText) {
            questionText.textContent =
                "Error al cargar las preguntas.";
        }
    }
}

/**
 * Renderiza la pregunta actual.
 */
function renderQuestion() {
    const question = questions[currentQuestionIndex];

    if (!question) {
        return;
    }

    const questionNumber = document.getElementById("question-number");
    const questionText = document.getElementById("question-text");
    const questionCounter = document.getElementById("question-counter");
    const progressFill = document.getElementById("progress-fill");
    const optionsContainer = document.getElementById("options-container");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (questionNumber) {
        questionNumber.textContent = currentQuestionIndex + 1;
    }

    if (questionText) {
        questionText.textContent = question.enunciado;
    }

    if (questionCounter) {
        questionCounter.textContent =
            `${currentQuestionIndex + 1}/${questions.length}`;
    }

    if (progressFill) {
        const progress =
            ((currentQuestionIndex + 1) / questions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    if (optionsContainer) {
        optionsContainer.innerHTML = "";

        question.opciones.forEach((option) => {
            const button = document.createElement("button");
            button.className = "option";
            button.type = "button";
            button.textContent = option.texto;

            if (
                answers[question.id_pregunta] === option.id_opcion
            ) {
                button.classList.add("selected");
            }

            button.addEventListener("click", () => {
                answers[question.id_pregunta] = option.id_opcion;
                renderQuestion();
            });

            optionsContainer.appendChild(button);
        });
    }

    if (prevBtn) {
        prevBtn.disabled = currentQuestionIndex === 0;
    }

    if (nextBtn) {
        nextBtn.textContent =
            currentQuestionIndex === questions.length - 1
                ? "Finalizar"
                : "Siguiente";
    }
}

/**
 * Ir a la siguiente pregunta.
 */
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        finalizarExamen();
    }
}

/**
 * Ir a la pregunta anterior.
 */
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

/**
 * Iniciar temporizador.
 */
function startTimer() {
    updateTimer();

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimer();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            finalizarExamen();
        }
    }, 1000);
}

/**
 * Actualizar contador del tiempo.
 */
function updateTimer() {
    const timer = document.getElementById("timer");

    if (timer) {
        timer.textContent = `${timeRemaining}s`;
    }
}

/**
 * Calcula respuestas correctas.
 *
 * Nota:
 * Tu endpoint /api/examen/questions actualmente NO envía
 * es_correcta, por lo que no podemos calcular el puntaje
 * real en el frontend. Mientras tanto, usamos la cantidad
 * de preguntas respondidas como aproximación temporal.
 */
function calcularCorrectas() {
    let respondidas = 0;

    questions.forEach((question) => {
        if (answers[question.id_pregunta] !== undefined) {
            respondidas++;
        }
    });

    return respondidas;
}

/**
 * Finaliza el examen.
 */
async function finalizarExamen() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    const correctas = calcularCorrectas();
    const total = questions.length;

    // Mientras no tengamos la respuesta correcta en el backend,
    // esto usa preguntas respondidas como base.
    const porcentaje =
        total > 0 ? (correctas / total) * 100 : 0;

    const aprobado = porcentaje >= 80;

    // Convertir tipos para que coincidan con la restricción
    // de la base de datos: normal | random
    const selectedType =
        localStorage.getItem("selectedExamType") || "random";

    const tipoGenerado =
        selectedType === "random"
            ? "random"
            : "normal";

    const resultado = {
        id_usuario:
            parseInt(localStorage.getItem("id_usuario")) || 1,

        id_examen:
            parseInt(localStorage.getItem("id_examen")) || 1,

        tipo_generado: tipoGenerado,
        puntaje: porcentaje,
        aprobado: aprobado
    };

    try {
        const response = await fetch(
            `${API_BASE}/guardar_resultado`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(resultado)
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(
                "El backend no devolvió success=true."
            );
        }

        // Guardar resultado para resultados.html
        localStorage.setItem(
            "ultimoResultado",
            JSON.stringify({
                correctas,
                total,
                porcentaje,
                aprobado,
                id_intento: data.id_intento
            })
        );

        // Guardar examen por si luego deseas revisión
        localStorage.setItem(
            "examQuestions",
            JSON.stringify(questions)
        );

        localStorage.setItem(
            "examAnswers",
            JSON.stringify(answers)
        );

        // Redirigir a resultados
        window.location.href = "/resultados";
    } catch (error) {
        console.error("Error al guardar resultado:", error);
        alert("No se pudo guardar el resultado del examen.");
    }
}

/**
 * Inicialización.
 */
document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    if (nextBtn) {
        nextBtn.addEventListener("click", nextQuestion);
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", prevQuestion);
    }

    loadQuestions();
});