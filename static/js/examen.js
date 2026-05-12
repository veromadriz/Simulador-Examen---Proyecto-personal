let questions = [];
let currentQuestionIndex = 0;
let answers = {};
let timeRemaining = 60;
let timerInterval;

async function loadQuestions() {
    try {
        const examType = localStorage.getItem('selectedExamType') || 'random';
        const response = await fetch(`/api/examen/questions?type=${examType}`);
        questions = await response.json();

        if (!questions.length) {
            document.getElementById('question-text').textContent =
                'No hay preguntas disponibles.';
            return;
        }

        startTimer();
        renderQuestion();
    } catch (error) {
        console.error('Error cargando preguntas:', error);
        document.getElementById('question-text').textContent =
            'Error al cargar las preguntas.';
    }
}

function renderQuestion() {
        question.enunciado;

    document.getElementById('question-counter').textContent =
        `${currentQuestionIndex + 1}/${questions.length}`;

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;

    const container = document.getElementById('options-container');
    container.innerHTML = '';

    question.opciones.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option.texto;

        if (answers[question.id_pregunta] === option.id_opcion) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => {
            answers[question.id_pregunta] = option.id_opcion;
            renderQuestion();
        });

        container.appendChild(button);
    });

    document.getElementById('prev-btn').disabled =
        currentQuestionIndex === 0;

    document.getElementById('next-btn').textContent =
        currentQuestionIndex === questions.length - 1
            ? 'Finalizar'
            : 'Siguiente';
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        finishExam();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function startTimer() {
    updateTimer();

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimer();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            finishExam();
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('timer').textContent = `${timeRemaining}s`;
}
function finishExam() {
    clearInterval(timerInterval);

    localStorage.setItem('examQuestions', JSON.stringify(questions));
    localStorage.setItem('examAnswers', JSON.stringify(answers));

    window.location.href = '/resultados';
}

// EVENT LISTENERS

document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('prev-btn').addEventListener('click', prevQuestion);

loadQuestions();

function startExam(type) {
    localStorage.setItem('selectedExamType', type);
    window.location.href = '/examen';
}

function selectCategory() {
    window.location.href = '/category-selection';
}