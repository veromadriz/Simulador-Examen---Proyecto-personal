(function () {
    const h = React.createElement;
    const { useEffect, useMemo, useRef, useState } = React;

    const API_BASE =
        window.location.origin && window.location.origin !== "null"
            ? window.location.origin
            : "http://127.0.0.1:5000";

    async function fetchJson(path, options = {}) {
        const response = await fetch(`${API_BASE}${path}`, {
            credentials: "include",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const error = new Error((data && data.message) || `HTTP ${response.status}`);
            error.response = response;
            error.data = data;
            throw error;
        }

        return data;
    }

    function RootApp() {
        const path = window.location.pathname.replace(/\/+$/, "") || "/";

        if (path === "/" || path.endsWith("/index.html")) {
            return h(HomePage);
        }

        if (path.endsWith("/examenes.html")) {
            return h(ExamenesPage);
        }

        if (path.endsWith("/connie") || path.endsWith("/connie.html")) {
            return h(ConniePage);
        }

        if (path.endsWith("/manual.html")) {
            return h(ManualPage);
        }

        if (path.endsWith("/examen")) {
            return h(ExamPage);
        }

        if (path.endsWith("/resultados")) {
            return h(ResultadosPage);
        }

        if (path.endsWith("/category-selection")) {
            return h(CategorySelectionPage);
        }

        return h(HomePage);
    }

    function HomePage() {
        const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || "");
        const [idUsuario, setIdUsuario] = useState(localStorage.getItem("id_usuario") || "");
        const [isLogin, setIsLogin] = useState(true);
        const [modalOpen, setModalOpen] = useState(false);
        const [form, setForm] = useState({ nombre: "", email: "", password: "" });
        const [toast, setToast] = useState("");
        const [stats, setStats] = useState({ examenes: 0, promedio: 0, temas: 0 });

        useEffect(() => {
            if (idUsuario) {
                loadStats(idUsuario);
            }
        }, [idUsuario]);

        useEffect(() => {
            if (!toast) {
                return undefined;
            }

            const timer = window.setTimeout(() => setToast(""), 3000);
            return () => window.clearTimeout(timer);
        }, [toast]);

        async function loadStats(userId) {
            try {
                const data = await fetchJson(`/estadisticas/${userId}`);
                setStats({
                    examenes: data.total_examenes ?? 0,
                    promedio: data.promedio ?? 0,
                    temas: data.mejor_nota ?? 0
                });
            } catch (error) {
                console.error("Error cargando estadísticas:", error);
            }
        }

        function openLogin() {
            setIsLogin(true);
            setModalOpen(true);
        }

        function openRegister() {
            setIsLogin(false);
            setModalOpen(true);
        }

        function closeModal() {
            setModalOpen(false);
        }

        function updateForm(field, value) {
            setForm((current) => ({ ...current, [field]: value }));
        }

        async function submitForm() {
            try {
                if (isLogin) {
                    const data = await fetchJson("/login", {
                        method: "POST",
                        body: JSON.stringify({
                            email: form.email,
                            password: form.password
                        })
                    });

                    localStorage.setItem("usuario", data.nombre);
                    localStorage.setItem("id_usuario", data.id_usuario);
                    setUsuario(data.nombre);
                    setIdUsuario(String(data.id_usuario));
                    setToast(`Bienvenido, ${data.nombre} 😌`);
                    setModalOpen(false);
                    setForm({ nombre: "", email: "", password: "" });
                    return;
                }

                await fetchJson("/register", {
                    method: "POST",
                    body: JSON.stringify({
                        nombre: form.nombre,
                        email: form.email,
                        password: form.password
                    })
                });

                setToast("Cuenta creada 😌 ahora inicia sesión");
                setIsLogin(true);
                setForm({ nombre: "", email: "", password: "" });
            } catch (error) {
                window.alert(error.message || "No se pudo completar la acción.");
            }
        }

        function logout() {
            localStorage.removeItem("usuario");
            localStorage.removeItem("id_usuario");
            localStorage.removeItem("ultimoResultado");
            localStorage.removeItem("selectedExamType");
            localStorage.removeItem("id_examen");
            setUsuario("");
            setIdUsuario("");
            setStats({ examenes: 0, promedio: 0, temas: 0 });
        }

        const loggedIn = Boolean(usuario);

        function actionCard(card) {
            return h(
                "div",
                { className: `action-card ${card.className}`, key: card.title },
                h("h2", null, card.title),
                h(
                    "div",
                    { className: "card-content" },
                    h(
                        "a",
                        {
                            href: loggedIn ? card.href : "#",
                            className: loggedIn ? "btn" : "btn disabled",
                            onClick: (event) => {
                                if (!loggedIn) {
                                    event.preventDefault();
                                }
                            }
                        },
                        loggedIn ? card.label : `🔒 ${card.label}`
                    )
                )
            );
        }

        return h(
            React.Fragment,
            null,
            h(
                "header",
                { className: "navbar" },
                h(
                    "div",
                    { className: "logo" },
                    h("img", {
                        src: "/static/assets/eeee.png",
                        alt: "Logo Connie",
                        className: "logo-img"
                    }),
                    h("span", { className: "logo-text" }, "DrivePrep")
                ),
                h(
                    "div",
                    { className: "nav-right" },
                    !loggedIn && h("button", { className: "nav-btn", onClick: openLogin }, "Iniciar sesión"),
                    !loggedIn && h("button", { className: "nav-btn", onClick: openRegister }, "Registrarse"),
                    loggedIn && h(
                        "div",
                        { id: "nav-usuario", style: { display: "flex" } },
                        h("span", { id: "user-name" }, usuario),
                        h("button", { id: "logout-btn", className: "nav-btn logout", onClick: logout }, "Cerrar sesión")
                    )
                )
            ),
            h(
                "h1",
                { id: "welcome-title" },
                loggedIn ? `Hola, ${usuario} 😌` : "¡Bienvenida a DrivePrep 🚗"
            ),
            h("div", { id: "toast", className: toast ? "toast show" : "toast" }, toast),
            loggedIn && h(
                "section",
                { id: "stats-section", className: "stats" },
                statCard("Exámenes", stats.examenes, "hechos y aprobados"),
                statCard("Promedio", `${stats.promedio}%`, "preparación"),
                statCard("Temas", stats.temas, "dominados")
            ),
            h(
                "main",
                { className: "dashboard" },
                h(
                    "div",
                    { className: "actions" },
                    actionCard({ className: "action-examenes", title: "Exámenes", href: "/examenes.html", label: "Prueba tu conocimiento" }),
                    actionCard({ className: "action-chatbot", title: "Chatbot", href: "/connie", label: "Pregúntale a Connie" }),
                    actionCard({ className: "action-manual", title: "Manual", href: "/manual.html", label: "Leer Manual" }),
                    actionCard({
                        className: "action-practico",
                        title: "Práctico",
                        href: "https://www.drivingskillsforlife.com/media/games/vr2pc/sub/roundabout/index.html",
                        label: "Simulación"
                    })
                )
            ),
            modalOpen && h(
                "div",
                { id: "modal-login", className: "modal", style: { display: "flex" }, onClick: closeModal },
                h(
                    "div",
                    { className: "modal-content", onClick: (event) => event.stopPropagation() },
                    h("span", { id: "close-modal", onClick: closeModal }, "×"),
                    h("h2", { id: "form-title" }, isLogin ? "Iniciar sesión" : "Registrarse"),
                    !isLogin && h("input", {
                        type: "text",
                        placeholder: "Nombre",
                        id: "register-nombre",
                        value: form.nombre,
                        onChange: (event) => updateForm("nombre", event.target.value)
                    }),
                    h("input", {
                        type: "email",
                        placeholder: "Correo",
                        id: "form-email",
                        value: form.email,
                        onChange: (event) => updateForm("email", event.target.value)
                    }),
                    h("input", {
                        type: "password",
                        placeholder: "Contraseña",
                        id: "form-password",
                        value: form.password,
                        onChange: (event) => updateForm("password", event.target.value)
                    }),
                    h("button", { id: "submit-btn", onClick: submitForm }, isLogin ? "Entrar" : "Crear cuenta"),
                    h(
                        "p",
                        { id: "toggle-form", style: { cursor: "pointer", marginTop: "10px" }, onClick: () => setIsLogin((current) => !current) },
                        isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"
                    )
                )
            )
        );
    }

    function statCard(title, value, subtitle) {
        return h(
            "div",
            { className: "stat-card", key: title },
            h("h3", null, title),
            h("p", { id: `stat-${title.toLowerCase()}` }, value),
            h("span", null, subtitle)
        );
    }

    function ExamenesPage() {
        const [stats, setStats] = useState({ examenes: 0, promedio: 0, temas: 0 });

        useEffect(() => {
            loadStats();
        }, []);

        async function loadStats() {
            try {
                const data = await fetchJson("/api/examen/stats");
                setStats({
                    examenes: data.examenes ?? 0,
                    promedio: data.promedio ?? 0,
                    temas: data.temas ?? 0
                });
            } catch (error) {
                console.error("Error cargando stats:", error);
            }
        }

        function startExam(type) {
            localStorage.setItem("selectedExamType", type);
            localStorage.setItem("id_examen", 1);
            window.location.href = "/examen";
        }

        function selectCategory() {
            window.location.href = "/category-selection";
        }

        return h(
            React.Fragment,
            null,
            h(
                "header",
                { className: "navbar" },
                h("div", { className: "logo" }, "🚗 DrivePrep"),
                h(
                    "nav",
                    null,
                    h("a", { href: "/" }, "Inicio"),
                    h("a", { href: "/manual.html" }, "Estudiar"),
                    h("a", { href: "/examenes.html", className: "active" }, "Exámenes"),
                    h("a", { href: "/resultados" }, "Progreso")
                )
            ),
            h(
                "main",
                { className: "exam-dashboard" },
                h(
                    "section",
                    { className: "hero" },
                    h("h1", null, "Elige tu tipo de examen"),
                    h("p", null, "Pon a prueba tus conocimientos y descubre qué tan preparado estás.")
                ),
                h(
                    "section",
                    { className: "stats" },
                    examStatCard("📝", `${stats.examenes ?? 0}`, "Exámenes realizados"),
                    examStatCard("📈", `${stats.promedio ?? 0}%`, "Promedio"),
                    examStatCard("🏆", `${stats.temas ?? 0}`, "Temas dominados")
                ),
                h(
                    "section",
                    { className: "exam-cards" },
                    examCard("blue", "fa-stethoscope", "Diagnóstico", "Descubre qué temas necesitas reforzar.", () => startExam("diagnostic"), "Iniciar diagnóstico"),
                    examCard("purple", "fa-fire", "Examen Extremo", "El desafío más difícil de DrivePrep.", () => startExam("extreme"), "Acepto el reto"),
                    examCard("green", "fa-book", "Por Categoría", "Practica sólo el tema que tú elijas.", selectCategory, "Elegir categoría"),
                    examCard("orange", "fa-dice", "Aleatorio", "Una mezcla sorpresa de preguntas.", () => startExam("random"), "Comenzar examen")
                ),
                h(
                    "section",
                    { className: "recommendation" },
                    h("h3", null, "🎯 Recomendación personalizada"),
                    h("p", null, "Te recomendamos practicar Señales de tránsito antes de intentar otro examen completo.")
                )
            )
        );
    }

    function examStatCard(icon, value, label) {
        return h(
            "div",
            { className: "stat-card", key: label },
            h("span", null, icon),
            h("h3", null, value),
            h("p", null, label)
        );
    }

    function examCard(theme, iconClass, title, description, onClick, buttonLabel) {
        return h(
            "article",
            { className: `exam-card ${theme}` },
            h("i", { className: `fas ${iconClass}` }),
            h("h2", null, title),
            h("p", null, description),
            h("button", { onClick }, buttonLabel)
        );
    }

    function ConniePage() {
        const [messages, setMessages] = useState([
            {
                role: "connie",
                text: "¡Hola! Soy tu asistente virtual de autoescuela retro. ¿En qué puedo ayudarte hoy?"
            }
        ]);
        const [input, setInput] = useState("");
        const [sending, setSending] = useState(false);
        const chatBodyRef = useRef(null);

        useEffect(() => {
            if (chatBodyRef.current) {
                chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
            }
        }, [messages, sending]);

        async function sendMessage() {
            const text = input.trim();

            if (!text || sending) {
                return;
            }

            setMessages((current) => [...current, { role: "user", text }]);
            setInput("");
            setSending(true);

            try {
                const data = await fetchJson("/api/connie", {
                    method: "POST",
                    body: JSON.stringify({ message: text })
                });

                setMessages((current) => [...current, { role: "connie", text: data.reply || "No entendí tu mensaje." }]);
            } catch (error) {
                setMessages((current) => [...current, { role: "connie", text: "No pude responder en este momento." }]);
                console.error(error);
            } finally {
                setSending(false);
            }
        }

        return h(
            React.Fragment,
            null,
            h(
                "header",
                { className: "chat-header" },
                h("a", { href: "/", className: "menu-btn" }, "🏠 Menú"),
                h(
                    "div",
                    { className: "header-title" },
                    h("div", { className: "header-avatar" }, "🚗"),
                    "Pregúntale a Connie"
                ),
                h("div", { style: { width: "100px" } })
            ),
            h(
                "div",
                { className: "chat-body", ref: chatBodyRef },
                messages.map((message, index) => messageBubble(message, index)),
                sending && typingBubble()
            ),
            h(
                "div",
                { className: "chat-input-area" },
                h(
                    "div",
                    { className: "input-wrapper" },
                    h("input", {
                        type: "text",
                        id: "user-input",
                        placeholder: "Pregúntale algo a Connie…",
                        autoComplete: "off",
                        value: input,
                        onChange: (event) => setInput(event.target.value),
                        onKeyDown: (event) => {
                            if (event.key === "Enter") {
                                sendMessage();
                            }
                        }
                    }),
                    h(
                        "button",
                        {
                            className: "send-btn",
                            id: "send-btn",
                            onClick: sendMessage,
                            disabled: sending
                        },
                        "➤"
                    )
                )
            )
        );
    }

    function messageBubble(message, index) {
        const isUser = message.role === "user";

        return h(
            "div",
            { className: `msg-row ${isUser ? "user" : ""}`, key: index },
            !isUser && h("div", { className: "msg-avatar" }, "🚗"),
            h("div", { className: `bubble ${isUser ? "user" : "connie"}` }, message.text),
            isUser && h("div", { className: "msg-avatar" }, "🧑")
        );
    }

    function typingBubble() {
        return h(
            "div",
            { className: "msg-row" },
            h("div", { className: "msg-avatar" }, "🚗"),
            h(
                "div",
                { className: "bubble connie typing" },
                h("span", null),
                h("span", null),
                h("span", null)
            )
        );
    }

    function ManualPage() {
        const styles = {
            page: {
                minHeight: "100vh",
                padding: "32px 20px",
                background: "linear-gradient(180deg, #fdf1e7 0%, #f9eadc 100%)",
                fontFamily: "Poppins, sans-serif",
                color: "#5a4d5d"
            },
            shell: {
                maxWidth: "1120px",
                margin: "0 auto"
            },
            hero: {
                background: "white",
                borderRadius: "28px",
                padding: "32px",
                boxShadow: "0 18px 40px rgba(0,0,0,0.09)",
                marginBottom: "24px"
            },
            title: {
                margin: 0,
                fontSize: "clamp(2rem, 4vw, 3.2rem)"
            },
            subtitle: {
                margin: "12px 0 0",
                lineHeight: 1.8,
                color: "#7a6b79"
            },
            grid: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px"
            },
            card: {
                background: "white",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 18px 40px rgba(0,0,0,0.09)"
            },
            linkRow: {
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "20px"
            },
            button: {
                display: "inline-block",
                borderRadius: "16px",
                padding: "12px 18px",
                background: "#f79d65",
                color: "white",
                textDecoration: "none",
                fontWeight: 700
            }
        };

        return h(
            "main",
            { style: styles.page },
            h(
                "div",
                { style: styles.shell },
                h(
                    "section",
                    { style: styles.hero },
                    h("h1", { style: styles.title }, "Manual de estudio"),
                    h(
                        "p",
                        { style: styles.subtitle },
                        "Esta versión React deja listo el espacio para convertir el manual en contenido dinámico. Mientras tanto, puedes usarlo como base para agregar temas, tarjetas y contenido guiado sin salir del flujo principal."
                    ),
                    h(
                        "div",
                        { style: styles.linkRow },
                        h("a", { href: "/examenes.html", style: styles.button }, "Ir a exámenes"),
                        h("a", { href: "/connie", style: styles.button }, "Preguntar a Connie")
                    )
                ),
                h(
                    "section",
                    { style: styles.grid },
                    studyCard("Señales de tránsito", "Repasa significados, advertencias y prioridades antes de entrar al examen."),
                    studyCard("Reglas básicas", "Ten a mano los conceptos de conducción segura y preferencia vial."),
                    studyCard("Simulación", "Combina estudio y práctica para ver cómo avanzas entre intentos.")
                )
            )
        );
    }

    function studyCard(title, description) {
        return h(
            "article",
            {
                style: {
                    background: "white",
                    borderRadius: "24px",
                    padding: "24px",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.09)"
                }
            },
            h("h2", { style: { margin: "0 0 10px" } }, title),
            h("p", { style: { margin: 0, lineHeight: 1.8, color: "#7a6b79" } }, description)
        );
    }

    function ExamPage() {
        const [questions, setQuestions] = useState([]);
        const [currentIndex, setCurrentIndex] = useState(0);
        const [answers, setAnswers] = useState({});
        const [timeRemaining, setTimeRemaining] = useState(300);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");
        const [isSubmitting, setIsSubmitting] = useState(false);
        const finishedRef = useRef(false);

        useEffect(() => {
            loadQuestions();
        }, []);

        useEffect(() => {
            if (!questions.length || loading || error || finishedRef.current) {
                return undefined;
            }

            const timerId = window.setInterval(() => {
                setTimeRemaining((current) => (current > 0 ? current - 1 : 0));
            }, 1000);

            return () => window.clearInterval(timerId);
        }, [questions, loading, error]);

        useEffect(() => {
            if (questions.length && timeRemaining === 0 && !finishedRef.current) {
                finalizarExamen();
            }
        }, [questions, timeRemaining]);

        async function loadQuestions() {
            try {
                const examType = localStorage.getItem("selectedExamType") || "random";
                const response = await fetch(`${API_BASE}/api/examen/questions?type=${encodeURIComponent(examType)}`, {
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();

                if (!Array.isArray(data) || data.length === 0) {
                    setError("No hay preguntas disponibles.");
                    setLoading(false);
                    return;
                }

                setQuestions(data);
                setLoading(false);
            } catch (caughtError) {
                console.error("Error cargando preguntas:", caughtError);
                setError("Error al cargar las preguntas.");
                setLoading(false);
            }
        }

        const currentQuestion = questions[currentIndex];
        const selectedOption = currentQuestion ? answers[currentQuestion.id_pregunta] : undefined;

        function selectOption(questionId, optionId) {
            setAnswers((current) => ({
                ...current,
                [questionId]: optionId
            }));
        }

        function nextQuestion() {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex((value) => value + 1);
                return;
            }

            finalizarExamen();
        }

        function prevQuestion() {
            if (currentIndex > 0) {
                setCurrentIndex((value) => value - 1);
            }
        }

        function calcularCorrectas() {
            let respondidas = 0;

            questions.forEach((question) => {
                if (answers[question.id_pregunta] !== undefined) {
                    respondidas += 1;
                }
            });

            return respondidas;
        }

        async function finalizarExamen() {
            if (finishedRef.current || isSubmitting || !questions.length) {
                return;
            }

            finishedRef.current = true;
            setIsSubmitting(true);

            const correctas = calcularCorrectas();
            const total = questions.length;
            const porcentaje = total > 0 ? (correctas / total) * 100 : 0;
            const aprobado = porcentaje >= 80;
            const selectedType = localStorage.getItem("selectedExamType") || "random";
            const tipoGenerado = selectedType === "random" ? "random" : "normal";

            const resultado = {
                id_usuario: parseInt(localStorage.getItem("id_usuario"), 10) || 1,
                id_examen: parseInt(localStorage.getItem("id_examen"), 10) || 1,
                tipo_generado: tipoGenerado,
                puntaje: porcentaje,
                aprobado
            };

            try {
                const data = await fetchJson("/guardar_resultado", {
                    method: "POST",
                    body: JSON.stringify(resultado)
                });

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
                localStorage.setItem("examQuestions", JSON.stringify(questions));
                localStorage.setItem("examAnswers", JSON.stringify(answers));
                window.location.href = "/resultados";
            } catch (caughtError) {
                console.error("Error al guardar resultado:", caughtError);
                finishedRef.current = false;
                window.alert("No se pudo guardar el resultado del examen.");
            } finally {
                setIsSubmitting(false);
            }
        }

        const progressWidth = questions.length
            ? ((currentIndex + 1) / questions.length) * 100
            : 0;

        const questionLabel = questions.length ? `${currentIndex + 1}/${questions.length}` : "0/0";

        if (loading) {
            return h(
                "main",
                { className: "exam-container" },
                h("section", { className: "question-card" }, h("h2", null, "Cargando pregunta..."))
            );
        }

        if (error) {
            return h(
                "main",
                { className: "exam-container" },
                h("section", { className: "question-card" }, h("h2", null, error))
            );
        }

        if (!currentQuestion) {
            return null;
        }

        return h(
            React.Fragment,
            null,
            h(
                "header",
                { className: "exam-header" },
                h(
                    "button",
                    {
                        className: "menu-btn",
                        onClick: () => { window.location.href = "/examenes.html"; }
                    },
                    "🏠 Menú"
                ),
                h(
                    "div",
                    { className: "exam-title" },
                    h("div", { className: "title-icon" }),
                    h("h1", { id: "exam-title" }, "Quiz Final")
                ),
                h(
                    "div",
                    { className: "header-right" },
                    h("div", { className: "timer-pill" }, "⏱️ ", h("span", { id: "timer" }, `${timeRemaining}s`)),
                    h("div", { className: "question-counter", id: "question-counter" }, questionLabel)
                )
            ),
            h(
                "section",
                { className: "progress-wrapper" },
                h(
                    "div",
                    { className: "progress-bar" },
                    h("div", {
                        className: "progress-fill",
                        id: "progress-fill",
                        style: { width: `${progressWidth}%` }
                    })
                )
            ),
            h(
                "main",
                { className: "exam-container" },
                h(
                    "section",
                    { className: "question-card" },
                    h("div", { className: "question-number", id: "question-number" }, currentIndex + 1),
                    h("h2", { id: "question-text" }, currentQuestion.enunciado)
                ),
                h(
                    "section",
                    { className: "options-container", id: "options-container" },
                    currentQuestion.opciones.map((option) =>
                        h(
                            "button",
                            {
                                key: option.id_opcion,
                                className: `option ${selectedOption === option.id_opcion ? "selected" : ""}`,
                                type: "button",
                                onClick: () => selectOption(currentQuestion.id_pregunta, option.id_opcion)
                            },
                            option.texto
                        )
                    )
                ),
                h(
                    "section",
                    { className: "navigation-buttons" },
                    h(
                        "button",
                        {
                            className: "secondary-btn",
                            id: "prev-btn",
                            disabled: currentIndex === 0,
                            onClick: prevQuestion
                        },
                        "Anterior"
                    ),
                    h(
                        "button",
                        {
                            className: "primary-btn",
                            id: "next-btn",
                            onClick: nextQuestion,
                            disabled: isSubmitting
                        },
                        currentIndex === questions.length - 1 ? "Finalizar" : "Siguiente"
                    )
                )
            )
        );
    }

    function ResultadosPage() {
        const resultado = JSON.parse(localStorage.getItem("ultimoResultado"));
        const estado = resultado
            ? resultado.aprobado
                ? "🎉 ¡Aprobaste el examen!"
                : "❌ No aprobaste el examen"
            : "No se encontraron resultados.";
        const correctas = resultado ? `${resultado.correctas}/${resultado.total}` : "0/0";
        const porcentaje = resultado ? Number(resultado.porcentaje).toFixed(1) : "0.0";

        return h(
            React.Fragment,
            null,
            h(
                "header",
                { className: "exam-header" },
                h(
                    "button",
                    {
                        className: "menu-btn",
                        onClick: () => { window.location.href = "/examenes.html"; }
                    },
                    "🏠 Menú"
                ),
                h("div", { className: "exam-title" }, h("h1", null, "Resultados")),
                h("div", { className: "header-right" }, h("div", { className: "question-counter" }, "🎯 Resultado final"))
            ),
            h(
                "main",
                { className: "exam-container" },
                h(
                    "section",
                    { className: "question-card" },
                    h("h2", { id: "estado" }, estado),
                    h(
                        "p",
                        { style: { fontSize: "1.2rem", marginTop: "1rem" } },
                        h("strong", null, "Respuestas correctas: "),
                        h("span", { id: "correctas" }, correctas)
                    ),
                    h(
                        "p",
                        { style: { fontSize: "1.2rem", marginTop: "0.5rem" } },
                        h("strong", null, "Porcentaje: "),
                        h("span", { id: "porcentaje" }, porcentaje),
                        "%"
                    )
                ),
                h(
                    "section",
                    { className: "navigation-buttons" },
                    h(
                        "button",
                        {
                            className: "secondary-btn",
                            onClick: () => { window.location.href = "/examenes.html"; }
                        },
                        "Volver a exámenes"
                    ),
                    h(
                        "button",
                        {
                            className: "primary-btn",
                            onClick: () => { window.location.href = "/examen"; }
                        },
                        "Repetir examen"
                    )
                )
            )
        );
    }

    function CategorySelectionPage() {
        const categories = [
            { id: "signals", title: "Señales de tránsito", description: "Practica la lectura rápida de señales y advertencias.", accent: "#4a90e2" },
            { id: "rules", title: "Reglas de circulación", description: "Refuerza prioridades, límites y normas básicas.", accent: "#8e44ad" },
            { id: "safety", title: "Seguridad vial", description: "Repasa buenas prácticas y prevención de riesgos.", accent: "#27ae60" }
        ];

        function chooseCategory(categoryId) {
            localStorage.setItem("selectedExamType", "category");
            localStorage.setItem("selectedCategory", categoryId);
            localStorage.setItem("id_examen", 1);
            window.location.href = "/examen";
        }

        return h(
            "main",
            { className: "exam-container" },
            h(
                "section",
                { className: "question-card" },
                h("h2", null, "Selección de Categoría"),
                h("p", null, "Elige una categoría para preparar tu siguiente examen."),
                h(
                    "div",
                    { style: { display: "grid", gap: "1rem", marginTop: "1.5rem" } },
                    categories.map((category) =>
                        h(
                            "button",
                            {
                                key: category.id,
                                type: "button",
                                className: "option",
                                onClick: () => chooseCategory(category.id),
                                style: {
                                    background: "white",
                                    borderLeft: `6px solid ${category.accent}`
                                }
                            },
                            h("strong", null, category.title),
                            h("div", { style: { marginTop: "0.4rem", color: "#7a6b79" } }, category.description)
                        )
                    )
                ),
                h(
                    "section",
                    { className: "navigation-buttons", style: { marginTop: "1.5rem" } },
                    h(
                        "button",
                        {
                            className: "secondary-btn",
                            onClick: () => { window.location.href = "/examenes.html"; }
                        },
                        "Volver"
                    ),
                    h(
                        "button",
                        {
                            className: "primary-btn",
                            onClick: () => { window.location.href = "/examen"; }
                        },
                        "Ir al examen"
                    )
                )
            )
        );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(h(RootApp));
})();