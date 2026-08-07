import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { fetchJson } from './api';

const LanguageContext = createContext(null);

const translations = {
  es: {
    exams: 'Exámenes', manual: 'Manual', back: 'Volver', results: 'Resultados',
    next: 'Siguiente', previous: 'Anterior', finish: 'Finalizar', repeat: 'Repetir examen',
    backToExams: 'Volver a exámenes', chapter: 'Capítulo', studyGuide: 'Ruta de estudio',
    startEssential: 'Empieza por lo esencial', studyGuideCopy: 'Leé cada tema corto primero y abrí los detalles solo cuando necesités profundizar.',
    examFocus: 'Para el examen', showLess: 'Mostrar menos', showMore: 'Ver {count} puntos más',
    correctAnswers: 'Respuestas correctas:', percentage: 'Porcentaje:', diagnostic: 'Diagnóstico de estudio',
    diagnosticTitle: 'Tu plan de repaso está listo', diagnosticCopy: 'No mostramos una nota en el diagnóstico: úsalo para descubrir qué reforzar primero.',
    reviewTopics: 'Temas que deberías repasar', reinforceTopics: 'Temas para reforzar', personalized: 'Recomendación personalizada',
    reviewCopy: 'Priorizados según las respuestas que necesitás revisar.', resultFinal: '🎯 Resultado final',
    light: 'Claro', dark: 'Oscuro', spanish: 'ES', english: 'EN'
    ,chooseExam: 'Elige tu tipo de examen', examIntro: 'Pon a prueba tus conocimientos y descubre qué tan preparado estás.',
    diagnosticCard: 'Diagnóstico', diagnosticCardCopy: 'Descubre qué temas necesitas reforzar.', extreme: 'Examen Extremo', extremeCopy: 'El desafío más difícil de DrivePrep.',
    byChapter: 'Por Capítulo', byChapterCopy: 'Practica exclusivamente el capítulo que elijas.', random: 'Aleatorio', randomCopy: 'Una mezcla sorpresa de preguntas.', start: 'Comenzar',
    reviewAnswers: 'Revisa tus respuestas', missedQuestions: 'Preguntas por reforzar', missedCopy: 'Estas son las respuestas que no coincidieron con la respuesta correcta.', yourAnswer: 'Tu respuesta:', correctAnswer: 'Respuesta correcta:',
    answerToReinforce: 'respuesta por reforzar', answersToReinforce: 'respuestas por reforzar'
    ,login: 'Iniciar sesión', loginMore: 'Inicia sesión para más', register: 'Registrarse', logout: 'Cerrar sesión', goToExams: 'Ir a exámenes', viewManual: 'Ver manual',
    simulator: 'Simulador teórico de manejo', homeTitle: 'Practica, mide tu progreso y aprueba con seguridad', homeCopy: 'Estudia, hacé exámenes y revisá tus avances sin perder el ritmo.',
    examsDone: 'Exámenes', average: 'Promedio', topics: 'Temas', chatbot: 'Chatbot', practical: 'Práctico', askConnie: 'Pregúntale a Connie', readManual: 'Leer manual', simulation: 'Simulación',
    guide: 'Guía de estudio', manualTitle: 'Manual de DrivePrep', manualCopy: 'Explorá el Manual del Conductor capítulo por capítulo.', loadingChapters: 'Cargando capítulos…',
    chapterSelection: 'Selección de Capítulo', chapterSelectionCopy: 'Elige un capítulo del manual para preparar tu siguiente examen.', questionsAvailable: 'preguntas disponibles',
    askConniePlaceholder: 'Pregúntale algo a Connie…', quizTitle: 'Quiz final',
    welcome: 'Hola, {name} ✨', accountCreated: 'Cuenta creada 💖 Ahora inicia sesión.', actionFailed: 'No se pudo completar la acción.',
    completedApproved: 'hechos y aprobados', preparation: 'preparación', progressing: 'con avance', totalReadiness: 'Preparación total', readinessByTopic: 'Preparación por tema',
    completeChapterExam: 'Completa un examen por capítulo para ver tu nivel por tema.', topicsToReview: 'Temas para revisar', takeExamRecommendation: 'Haz un examen para recibir recomendaciones de estudio.', testKnowledge: 'Prueba tu conocimiento',
    name: 'Nombre', email: 'Correo', password: 'Contraseña', enter: 'Entrar', createAccount: 'Crear cuenta', noAccount: '¿No tienes cuenta? Regístrate', hasAccount: '¿Ya tienes cuenta? Inicia sesión',
    examsTaken: 'Exámenes realizados', attemptedTotal: 'intentados en total', generalPerformance: 'rendimiento general', mastered: 'dominados', recommendationCopy: 'Te recomendamos practicar señales de tránsito antes de intentar otro examen completo.',
    connieGreeting: '¡Hola! Soy tu asistente virtual de autoescuela. ¿En qué puedo ayudarte hoy?', connieFallback: 'No entendí tu mensaje.', connieUnavailable: 'No pude responder en este momento.',
    manualPageCopy: 'Cada capítulo del manual del conductor tiene su propia página para que estudies a tu ritmo.', sections: 'secciones', noChapters: 'Todavía no hay capítulos', noChaptersCopy: 'El manual todavía no tiene contenido disponible.', manualLoadError: 'No se pudo cargar el manual.',
    chapterNotFound: 'Capítulo no encontrado.', chapterLoadError: 'No se pudo cargar este capítulo.', loadingChapter: 'Cargando capítulo…', backToManual: 'Volver al manual', noSections: 'Este capítulo todavía no tiene secciones cargadas.', topic: 'Tema', reviewMainIdeas: 'Repasá las ideas principales de este tema.',
    noQuestions: 'No hay preguntas disponibles para esta selección.', questionLoadError: 'Error al cargar las preguntas.', loadingQuestion: 'Cargando pregunta…', saveResultError: 'No se pudo guardar el resultado del examen.',
    passed: '🎉 ¡Aprobaste el examen!', failed: '💪 Sigue practicando', noResults: 'No se encontraron resultados.', chaptersLoadError: 'No se pudieron cargar los capítulos.', noChapterQuestions: 'Todavía no hay capítulos con preguntas disponibles.',
    readinessDescription: 'Tu nivel actual de preparación se refleja en la media de tus exámenes realizados.', homeAria: 'Ir a la página principal de DrivePrep', backHome: 'Volver al inicio', enableLight: 'Activar modo claro', enableDark: 'Activar modo oscuro', close: 'Cerrar', send: 'Enviar mensaje'
  },
  en: {
    exams: 'Exams', manual: 'Manual', back: 'Back', results: 'Results',
    next: 'Next', previous: 'Previous', finish: 'Finish', repeat: 'Retake exam',
    backToExams: 'Back to exams', chapter: 'Chapter', studyGuide: 'Study path',
    startEssential: 'Start with the essentials', studyGuideCopy: 'Read each short topic first, then open the details when you need to go deeper.',
    examFocus: 'For the exam', showLess: 'Show less', showMore: 'Show {count} more points',
    correctAnswers: 'Correct answers:', percentage: 'Percentage:', diagnostic: 'Study diagnostic',
    diagnosticTitle: 'Your review plan is ready', diagnosticCopy: 'Diagnostics do not show a grade: use it to discover what to strengthen first.',
    reviewTopics: 'Topics you should review', reinforceTopics: 'Topics to strengthen', personalized: 'Personalized recommendation',
    reviewCopy: 'Prioritized from the answers you need to review.', resultFinal: '🎯 Final result',
    light: 'Light', dark: 'Dark', spanish: 'ES', english: 'EN'
    ,chooseExam: 'Choose your exam type', examIntro: 'Test your knowledge and discover how prepared you are.',
    diagnosticCard: 'Diagnostic', diagnosticCardCopy: 'Discover which topics you need to strengthen.', extreme: 'Extreme Exam', extremeCopy: 'DrivePrep’s toughest challenge.',
    byChapter: 'By Chapter', byChapterCopy: 'Practice only the chapter you choose.', random: 'Random', randomCopy: 'A surprise mix of questions.', start: 'Start',
    reviewAnswers: 'Review your answers', missedQuestions: 'Questions to strengthen', missedCopy: 'These answers did not match the correct answer.', yourAnswer: 'Your answer:', correctAnswer: 'Correct answer:',
    answerToReinforce: 'answer to strengthen', answersToReinforce: 'answers to strengthen'
    ,login: 'Log in', loginMore: 'Log in for more', register: 'Sign up', logout: 'Log out', goToExams: 'Go to exams', viewManual: 'View manual',
    simulator: 'Driving theory exam simulator', homeTitle: 'Practice, track your progress, and pass with confidence', homeCopy: 'Study, take exams, and review your progress without losing momentum.',
    examsDone: 'Exams', average: 'Average', topics: 'Topics', chatbot: 'Chatbot', practical: 'Practical', askConnie: 'Ask Connie', readManual: 'Read manual', simulation: 'Simulation',
    guide: 'Study guide', manualTitle: 'DrivePrep Manual', manualCopy: 'Explore the Driver’s Manual chapter by chapter.', loadingChapters: 'Loading chapters…',
    chapterSelection: 'Chapter selection', chapterSelectionCopy: 'Choose a Manual chapter for your next exam.', questionsAvailable: 'questions available',
    askConniePlaceholder: 'Ask Connie anything…', quizTitle: 'Final quiz',
    welcome: 'Hello, {name} ✨', accountCreated: 'Account created 💖 You can now log in.', actionFailed: 'The action could not be completed.',
    completedApproved: 'completed and passed', preparation: 'readiness', progressing: 'in progress', totalReadiness: 'Overall readiness', readinessByTopic: 'Readiness by topic',
    completeChapterExam: 'Complete a chapter exam to see your readiness by topic.', topicsToReview: 'Topics to review', takeExamRecommendation: 'Take an exam to receive study recommendations.', testKnowledge: 'Test your knowledge',
    name: 'Name', email: 'Email', password: 'Password', enter: 'Log in', createAccount: 'Create account', noAccount: "Don't have an account? Sign up", hasAccount: 'Already have an account? Log in',
    examsTaken: 'Exams taken', attemptedTotal: 'attempted in total', generalPerformance: 'overall performance', mastered: 'mastered', recommendationCopy: 'We recommend practicing road signs before attempting another full exam.',
    connieGreeting: 'Hi! I am your virtual driving-school assistant. How can I help you today?', connieFallback: "I didn't understand your message.", connieUnavailable: "I can't respond right now.",
    manualPageCopy: "Each Driver's Manual chapter has its own page so you can study at your own pace.", sections: 'sections', noChapters: 'No chapters yet', noChaptersCopy: 'The manual does not have content available yet.', manualLoadError: 'The manual could not be loaded.',
    chapterNotFound: 'Chapter not found.', chapterLoadError: 'This chapter could not be loaded.', loadingChapter: 'Loading chapter…', backToManual: 'Back to manual', noSections: 'This chapter does not have any sections yet.', topic: 'Topic', reviewMainIdeas: 'Review the main ideas in this topic.',
    noQuestions: 'There are no questions available for this selection.', questionLoadError: 'The questions could not be loaded.', loadingQuestion: 'Loading question…', saveResultError: 'The exam result could not be saved.',
    passed: '🎉 You passed the exam!', failed: '💪 Keep practicing', noResults: 'No results were found.', chaptersLoadError: 'The chapters could not be loaded.', noChapterQuestions: 'There are no chapters with questions available yet.',
    readinessDescription: 'Your current readiness is based on the average of your completed exams.', homeAria: 'Go to the DrivePrep home page', backHome: 'Back to home', enableLight: 'Enable light mode', enableDark: 'Enable dark mode', close: 'Close', send: 'Send message'
  }
};

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('driveprep-language') || 'es');
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('driveprep-language', language);
  }, [language]);
  const t = (key, values = {}) => Object.entries(values).reduce((text, [name, value]) => text.replace(`{${name}}`, value), translations[language][key] || key);
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

function useLanguage() { return useContext(LanguageContext); }

function App() {
  return (
    <LanguageProvider><Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/examenes" element={<RequireLogin><ExamsPage /></RequireLogin>} />
      <Route path="/connie" element={<RequireLogin><ConniePage /></RequireLogin>} />
      <Route path="/manual" element={<ManualPage />} />
      <Route path="/manual/:capituloId" element={<ManualChapterPage />} />
      <Route path="/examen" element={<RequireLogin><ExamPage /></RequireLogin>} />
      <Route path="/resultados" element={<RequireLogin><ResultsPage /></RequireLogin>} />
      <Route path="/chapter-selection" element={<RequireLogin><ChapterSelectionPage /></RequireLogin>} />
      <Route path="/category-selection" element={<RequireLogin><Navigate to="/chapter-selection" replace /></RequireLogin>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></LanguageProvider>
  );
}

function RequireLogin({ children }) {
  const loggedIn = Boolean(localStorage.getItem('id_usuario') && localStorage.getItem('usuario'));
  return loggedIn ? children : <Navigate to="/" replace />;
}

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function clampPercent(value) {
  const numericValue = Number(value) || 0;
  return Math.min(100, Math.max(0, numericValue));
}

function readinessColor(percent) {
  if (percent >= 80) return '#33c58d';
  if (percent >= 60) return '#f7b84b';
  return '#ef6c6c';
}

function HomePage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario') || '');
  const [idUsuario, setIdUsuario] = useState(localStorage.getItem('id_usuario') || '');
  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [toast, setToast] = useState('');
  const [stats, setStats] = useState({ examenes: 0, promedio: 0, temas: 0, topicos: [] });
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });

  useEffect(() => {
    if (!idUsuario) return;
    loadStats(idUsuario);
  }, [idUsuario, language]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function loadStats(userId) {
    try {
      const data = await fetchJson(`/estadisticas/${userId}?lang=${language}`);
      setStats({
        examenes: data.total_examenes ?? 0,
        promedio: data.promedio ?? 0,
        temas: Array.isArray(data.topicos) ? data.topicos.length : 0,
        topicos: Array.isArray(data.topicos) ? data.topicos : []
      });
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  }

  async function submitForm() {
    try {
      if (isLogin) {
        const data = await fetchJson('/login', {
          method: 'POST',
          body: JSON.stringify({ email: form.email, password: form.password })
        });

        localStorage.setItem('usuario', data.nombre);
        localStorage.setItem('id_usuario', data.id_usuario);
        setUsuario(data.nombre);
        setIdUsuario(String(data.id_usuario));
        setToast(t('welcome', { name: data.nombre }));
        setModalOpen(false);
        setForm({ nombre: '', email: '', password: '' });
        return;
      }

      await fetchJson('/register', {
        method: 'POST',
        body: JSON.stringify({ nombre: form.nombre, email: form.email, password: form.password })
      });

      setToast(t('accountCreated'));
      setIsLogin(true);
      setForm({ nombre: '', email: '', password: '' });
    } catch (error) {
      window.alert(error.message || t('actionFailed'));
    }
  }

  function logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('ultimoResultado');
    localStorage.removeItem('selectedExamType');
    localStorage.removeItem('selectedChapterId');
    localStorage.removeItem('id_examen');
    setUsuario('');
    setIdUsuario('');
    setStats({ examenes: 0, promedio: 0, temas: 0, topicos: [] });
  }

  const loggedIn = Boolean(usuario);
  const sortedTopics = [...(stats.topicos || [])].sort((left, right) => Number(left.puntaje || 0) - Number(right.puntaje || 0));
  const topReviewTopics = sortedTopics.slice(0, 3);

  return (
    <div className="home-page">
      <header className="navbar navbar-home">
        <BrandLogo />
        <div className="nav-right">
          <ThemeToggle />
          {!loggedIn && <button className="nav-btn" onClick={() => { setIsLogin(true); setModalOpen(true); }}>{t('login')}</button>}
          {!loggedIn && <button className="nav-btn" onClick={() => { setIsLogin(false); setModalOpen(true); }}>{t('register')}</button>}
          {loggedIn && (
            <div id="nav-usuario" style={{ display: 'flex' }}>
              <span id="user-name">{usuario}</span>
              <button id="logout-btn" className="nav-btn logout" onClick={logout}>{t('logout')}</button>
            </div>
          )}
        </div>
      </header>

      <section className="hero-home">
        <div className="hero-copy-block">
          <p className="eyebrow">{t('simulator')}</p>
          <h1>{loggedIn ? t('welcome', { name: usuario }) : t('homeTitle')}</h1>
          <p className="hero-copy">
            {t('homeCopy')}
          </p>
          <div className="hero-actions">
            {loggedIn && <button className="primary-pill" onClick={() => navigate('/examenes')}>{t('goToExams')}</button>}
            <button className="secondary-pill" onClick={() => navigate('/manual')}>{t('viewManual')}</button>
            {!loggedIn && <button className="primary-pill" onClick={() => { setIsLogin(true); setModalOpen(true); }}>{t('loginMore')}</button>}
          </div>
        </div>
        <img src="/static/assets/happyconnie.png" alt="" aria-hidden="true" className="guest-connie hero-guest-connie" />
      </section>

      {loggedIn && (
        <>
          <section className="actions-grid dashboard-actions">
            <ActionCard title={t('exams')} icon="fa-clipboard-check" accent="accent-orange" onClick={() => navigate('/examenes')}>
              {t('testKnowledge')}
            </ActionCard>
            <ActionCard title={t('chatbot')} icon="fa-comments" accent="accent-purple" onClick={() => navigate('/connie')}>
              {t('askConnie')}
            </ActionCard>
            <ActionCard title={t('manual')} icon="fa-book-open" accent="accent-pink" onClick={() => navigate('/manual')}>
              {t('readManual')}
            </ActionCard>
            <ActionCard title={t('practical')} icon="fa-car-side" accent="accent-green" onClick={() => window.open('https://www.drivingskillsforlife.com/media/games/vr2pc/sub/roundabout/index.html', '_blank')}>
              {t('simulation')}
            </ActionCard>
          </section>

          <section className="stats-grid">
            <StatCard title={t('examsDone')} value={stats.examenes} subtitle={t('completedApproved')} />
            <StatCard title={t('average')} value={`${stats.promedio}%`} subtitle={t('preparation')} />
            <StatCard title={t('topics')} value={stats.temas} subtitle={t('progressing')} />
          </section>

          <section className="dashboard-visuals">
            <ReadinessGauge title={t('totalReadiness')} value={stats.promedio} />

            <div className="dashboard-side">
              <article className="panel topic-panel">
                <div className="panel-header">
                  <h3>{t('readinessByTopic')}</h3>
                  <span>{stats.topicos.length} {t('topics').toLowerCase()}</span>
                </div>

                {stats.topicos.length > 0 ? (
                  <div className="topic-progress-list">
                    {stats.topicos.map((topic, index) => (
                      <TopicProgressBar
                        key={topic.id ?? `${topic.titulo}-${index}`}
                        label={topic.titulo}
                        value={topic.puntaje}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">{t('completeChapterExam')}</p>
                )}
              </article>

              <article className="panel review-panel">
                <div className="panel-header">
                  <h3>{t('topicsToReview')}</h3>
                  <span>Top 3</span>
                </div>

                {topReviewTopics.length > 0 ? (
                  <ol className="review-list">
                    {topReviewTopics.map((topic, index) => (
                      <li key={topic.id ?? `${topic.titulo}-${index}`} className="review-item">
                        <div className="review-rank">#{index + 1}</div>
                        <div className="review-content">
                          <strong>{topic.titulo}</strong>
                          <span>{Math.round(Number(topic.puntaje || 0))}% {t('preparation')}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="empty-state">{t('takeExamRecommendation')}</p>
                )}
              </article>
            </div>
          </section>
        </>
      )}

      {modalOpen && (
        <div className="modal" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" aria-label={t('close')} title={t('close')} onClick={() => setModalOpen(false)}><i className="fas fa-xmark" /></button>
            <h2>{isLogin ? t('login') : t('register')}</h2>
            {!isLogin && (
              <input value={form.nombre} onChange={(event) => setForm((current) => ({ ...current, nombre: event.target.value }))} placeholder={t('name')} />
            )}
            <input value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder={t('email')} type="email" />
            <input value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} placeholder={t('password')} type="password" />
            <button className="primary-pill full-width" onClick={submitForm}>{isLogin ? t('enter') : t('createAccount')}</button>
            <button className="text-link" onClick={() => setIsLogin((current) => !current)}>
              {isLogin ? t('noAccount') : t('hasAccount')}
            </button>
          </div>
        </div>
      )}

      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}

function ExamsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const cards = [
    { title: t('diagnosticCard'), icon: 'fa-stethoscope', cls: 'blue', text: t('diagnosticCardCopy'), action: () => startExam('diagnostic') },
    { title: t('extreme'), icon: 'fa-fire', cls: 'purple', text: t('extremeCopy'), action: () => startExam('extreme') },
    { title: t('byChapter'), icon: 'fa-book', cls: 'green', text: t('byChapterCopy'), action: () => navigate('/chapter-selection') },
    { title: t('random'), icon: 'fa-dice', cls: 'orange', text: t('randomCopy'), action: () => startExam('random') }
  ];

  function startExam(type) {
    localStorage.setItem('selectedExamType', type);
    localStorage.removeItem('selectedChapterId');
    localStorage.setItem('id_examen', '1');
    navigate('/examen');
  }

  return (
    <main className="page-shell">
      <TopNav />
      <section className="panel hero-panel">
        <div><h1>{t('chooseExam')}</h1><p>{t('examIntro')}</p></div>
      </section>

      <section className="exam-cards-grid">
        {cards.map((card) => (
          <article className={`exam-card ${card.cls}`} key={card.title}>
            <i className={`fas ${card.icon}`} />
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <button onClick={card.action}>{t('start')}</button>
          </article>
        ))}
      </section>

    </main>
  );
}

function ConniePage() {
  const { language, t } = useLanguage();
  const chatBodyRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: 'connie', text: translations[localStorage.getItem('driveprep-language') || 'es'].connieGreeting }
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, sending]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || sending) return;

    const history = messages.slice(-8).map((message) => ({
      role: message.role === 'user' ? 'user' : 'assistant',
      content: message.text
    }));
    setMessages((current) => [...current, { role: 'user', text }]);
    setInput('');
    setSending(true);

    try {
      const data = await fetchJson('/api/manual/chat', {
        method: 'POST',
        body: JSON.stringify({ pregunta: text, historial: history, language })
      });

      setMessages((current) => [...current, { role: 'connie', text: data.respuesta || t('connieFallback') }]);
    } catch (aiError) {
      try {
        const fallback = await fetchJson('/api/connie', {
          method: 'POST',
          body: JSON.stringify({ message: text, language })
        });
        setMessages((current) => [...current, { role: 'connie', text: fallback.reply || t('connieFallback') }]);
      } catch (fallbackError) {
        setMessages((current) => [...current, { role: 'connie', text: t('connieUnavailable') }]);
        console.error(aiError, fallbackError);
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-shell">
      <header className="chat-header">
        <BrandLogo compact />
        <div className="header-title">
          <div className="header-avatar connie-portrait" role="img" aria-label="Connie" />
          {t('askConnie')}
        </div>
        <ThemeToggle />
      </header>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((message, index) => (
          <MessageBubble key={`${message.role}-${index}`} message={message} />
        ))}
        {sending && <TypingBubble />}
      </div>

      <div className="chat-input-area">
        <div className="input-wrapper">
          <input
            type="text"
            id="user-input"
            placeholder={t('askConniePlaceholder')}
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') sendMessage(); }}
          />
          <button className="send-btn" id="send-btn" aria-label={t('send')} title={t('send')} onClick={sendMessage} disabled={sending}><i className="fas fa-paper-plane" /></button>
        </div>
      </div>
    </div>
  );
}

// ─── Manual: mini-app propia con lista de capítulos + página por capítulo ──

function ManualPage() {
  const { language, t } = useLanguage();
  const [capitulos, setCapitulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchJson(`/api/manual/capitulos?lang=${language}`)
      .then((data) => {
        if (!data.ok) throw new Error(data.error || t('manualLoadError'));
        setCapitulos(data.capitulos || []);
      })
      .catch((err) => {
        console.error('Error cargando el manual:', err);
        setError(t('manualLoadError'));
      })
      .finally(() => setLoading(false));
  }, [language]);

  return (
    <main className="manual-page page-shell">
      <TopNav />
      <section className="panel hero-panel">
        <div><p className="eyebrow">{t('guide')}</p><h1>{t('manualTitle')}</h1><p>{t('manualPageCopy')}</p></div>
      </section>

      {loading && <div className="status-inline"><i className="fas fa-circle-notch fa-spin" /><span>{t('loadingChapters')}</span></div>}
      {!loading && error && <div className="status-inline error"><i className="fas fa-circle-exclamation" /><span>{error}</span></div>}

      {!loading && !error && (
        <section className="manual-grid">
          {capitulos.map((capitulo) => (
            <Link key={capitulo.id} to={`/manual/${capitulo.id}`} className="panel info-card chapter-card">
              <span className="chapter-icon"><i className="fas fa-book-open" /></span>
              <h2>{capitulo.titulo}</h2>
              <p>{capitulo.descripcion}</p>
              <span className="chapter-meta">{capitulo.total_secciones ?? 0} {t('sections')}</span>
            </Link>
          ))}

          {capitulos.length === 0 && (
            <article className="panel info-card">
              <h2>{t('noChapters')}</h2>
              <p>{t('noChaptersCopy')}</p>
            </article>
          )}
        </section>
      )}
    </main>
  );
}

function ManualChapterPage() {
  const { language, t } = useLanguage();
  const { capituloId } = useParams();
  const navigate = useNavigate();
  const [capitulo, setCapitulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchJson(`/api/manual/capitulos/${capituloId}?lang=${language}`)
      .then((data) => {
        if (!data.ok) throw new Error(data.error || t('chapterNotFound'));
        setCapitulo(data.capitulo);
      })
      .catch((err) => {
        console.error('Error cargando el capítulo:', err);
        setError(err.message || t('chapterLoadError'));
      })
      .finally(() => setLoading(false));
  }, [capituloId, language]);

  if (loading) return <CenteredMessage title={t('loadingChapter')} />;
  if (error) return <CenteredMessage title={error} />;
  if (!capitulo) return null;

  const secciones = capitulo.secciones || [];
  const featuredTopics = secciones.slice(0, 3).map((seccion) => seccion.subtitulo).filter(Boolean);

  return (
    <main className="manual-page page-shell">
      <TopNav />
      <button className="secondary-pill" onClick={() => navigate('/manual')}>← {t('backToManual')}</button>

      <section className="panel hero-panel">
        <p className="eyebrow">{t('chapter')} {capitulo.numero}</p>
        <h1>{capitulo.icono} {capitulo.titulo}</h1>
        {capitulo.descripcion && <p>{capitulo.descripcion}</p>}
      </section>

      <section className="manual-study-guide">
        <div>
          <p className="eyebrow">{t('studyGuide')}</p>
          <h2>{t('startEssential')}</h2>
          <p>{t('studyGuideCopy')}</p>
        </div>
        <div className="study-guide-topics">
          {featuredTopics.map((topic, index) => <span key={topic}>{index + 1}. {topic}</span>)}
        </div>
      </section>

      <section className="chapter-sections">
        {secciones.map((seccion, index) => (
          <ManualSection key={`${seccion.subtitulo}-${index}`} seccion={seccion} index={index} />
        ))}

        {secciones.length === 0 && (
          <article className="panel info-card">
            <p>{t('noSections')}</p>
          </article>
        )}
      </section>
    </main>
  );
}

function ManualSection({ seccion, index }) {
  const { t } = useLanguage();
  const paragraphs = (seccion.contenido || '').split('\n').filter(Boolean);
  const [showAll, setShowAll] = useState(false);
  const isLong = paragraphs.length > 4;
  const visibleParagraphs = showAll ? paragraphs : paragraphs.slice(0, 4);

  return (
    <details className="manual-section" open={index < 2}>
      <summary>
        <span className="section-index">{String(index + 1).padStart(2, '0')}</span>
        <span>{seccion.subtitulo || `${t('topic')} ${index + 1}`}</span>
        <span className="section-toggle" aria-hidden="true">⌄</span>
      </summary>
      <div className="manual-section-content">
        <div className="exam-focus">
          <span>{t('examFocus')}</span>
          <p>{paragraphs[0] || t('reviewMainIdeas')}</p>
        </div>
        <div className="section-reading-list">
          {visibleParagraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
        </div>
        {isLong && (
          <button className="manual-more-btn" type="button" onClick={() => setShowAll((current) => !current)}>
            {showAll ? t('showLess') : t('showMore', { count: paragraphs.length - 4 })}
          </button>
        )}
      </div>
    </details>
  );
}

function ExamPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setTimeRemaining(300);
    setError('');
    setLoading(true);
    finishedRef.current = false;
    loadQuestions();
  }, [language]);

  useEffect(() => {
    if (!questions.length || loading || error || finishedRef.current) return undefined;

    const timerId = window.setInterval(() => {
      setTimeRemaining((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [questions, loading, error]);

  useEffect(() => {
    if (questions.length && timeRemaining === 0 && !finishedRef.current) {
      finalizeExam();
    }
  }, [questions, timeRemaining]);

  async function loadQuestions() {
    try {
      const examType = localStorage.getItem('selectedExamType') || 'random';
      const params = new URLSearchParams({ type: examType, lang: language });

      if (examType === 'chapter') {
        const chapterId = localStorage.getItem('selectedChapterId');
        if (chapterId) params.set('capitulo_id', chapterId);
      }

      const data = await fetchJson(`/api/examen/questions?${params.toString()}`);

      if (!Array.isArray(data) || data.length === 0) {
        setError(t('noQuestions'));
        setLoading(false);
        return;
      }

      setQuestions(data);
      setLoading(false);
    } catch (caughtError) {
      console.error('Error cargando preguntas:', caughtError);
      setError(t('questionLoadError'));
      setLoading(false);
    }
  }

  const currentQuestion = questions[currentIndex];
  const selectedOption = currentQuestion ? answers[currentQuestion.id_pregunta] : undefined;
  const progressWidth = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

  function selectOption(questionId, optionId) {
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((value) => value + 1);
    } else {
      finalizeExam();
    }
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex((value) => value - 1);
    }
  }

  async function finalizeExam() {
    if (finishedRef.current || submitting || !questions.length) return;

    finishedRef.current = true;
    setSubmitting(true);

    // Mandamos las respuestas crudas; el backend es quien decide qué está
    // bien o mal (así no se puede hacer trampa leyendo el frontend).
    const respuestas = questions.map((question) => ({
      id_pregunta: question.id_pregunta,
      id_opcion: answers[question.id_pregunta] ?? null
    }));

    const selectedType = localStorage.getItem('selectedExamType') || 'random';
    const tipoGenerado = selectedType === 'diagnostic' ? 'diagnostic' : selectedType === 'random' ? 'random' : 'normal';

    try {
      const data = await fetchJson('/guardar_resultado', {
        method: 'POST',
        body: JSON.stringify({
          id_usuario: parseInt(localStorage.getItem('id_usuario'), 10) || 1,
          id_examen: parseInt(localStorage.getItem('id_examen'), 10) || 1,
          tipo_generado: tipoGenerado,
          respuestas,
          language
        })
      });

      localStorage.setItem('ultimoResultado', JSON.stringify({
        correctas: data.correctas,
        total: data.total,
        porcentaje: data.puntaje,
        aprobado: data.aprobado,
        id_intento: data.id_intento,
        errores: (data.revisiones || []).filter((revision) => !revision.es_correcta),
        temasARevisar: data.temas_a_repasar || [],
        modoDiagnostico: Boolean(data.modo_diagnostico)
      }));
      navigate('/resultados');
    } catch (caughtError) {
      console.error('Error al guardar resultado:', caughtError);
      finishedRef.current = false;
      window.alert(t('saveResultError'));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <CenteredMessage title={t('loadingQuestion')} />;
  }

  if (error) {
    return <CenteredMessage title={error} />;
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="exam-page">
      <header className="exam-header">
        <BrandLogo compact />
        <div className="exam-title">
          <i className="fas fa-clipboard-list title-icon" />
          <h1 id="exam-title">{t('quizTitle')}</h1>
        </div>
        <div className="header-right">
          <ThemeToggle />
          <div className="timer-pill"><i className="fas fa-stopwatch" /> <span id="timer">{timeRemaining}s</span></div>
          <div className="question-counter" id="question-counter">{currentIndex + 1}/{questions.length}</div>
        </div>
      </header>

      <section className="progress-wrapper">
        <div className="progress-bar">
          <div className="progress-fill" id="progress-fill" style={{ width: `${progressWidth}%` }} />
        </div>
      </section>

      <main className="exam-container">
        <section className="question-card">
          <div className="question-number" id="question-number">{currentIndex + 1}</div>
          <h2 id="question-text">{currentQuestion.enunciado}</h2>
        </section>

        <section className="options-container" id="options-container">
          {currentQuestion.opciones.map((option) => (
            <button
              key={option.id_opcion}
              className={`option ${selectedOption === option.id_opcion ? 'selected' : ''}`}
              type="button"
              onClick={() => selectOption(currentQuestion.id_pregunta, option.id_opcion)}
            >
              {option.texto}
            </button>
          ))}
        </section>

        <section className="navigation-buttons">
          <button className="secondary-btn" id="prev-btn" onClick={prevQuestion} disabled={currentIndex === 0}>{t('previous')}</button>
          <button className="primary-btn" id="next-btn" onClick={nextQuestion} disabled={submitting}>{currentIndex === questions.length - 1 ? t('finish') : t('next')}</button>
        </section>
      </main>
    </div>
  );
}

function ResultsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const resultado = safeParse(localStorage.getItem('ultimoResultado'));

  const estado = resultado
    ? resultado.aprobado
      ? t('passed')
      : t('failed')
    : t('noResults');

  const correctas = resultado ? `${resultado.correctas}/${resultado.total}` : '0/0';
  const porcentaje = resultado ? Number(resultado.porcentaje).toFixed(1) : '0.0';
  const errores = resultado?.errores || [];
  const temasARevisar = resultado?.temasARevisar || [];
  const modoDiagnostico = Boolean(resultado?.modoDiagnostico);

  return (
    <div className="exam-page">
      <header className="exam-header">
        <BrandLogo compact />
        <div className="exam-title"><h1>{t('results')}</h1></div>
        <div className="header-right"><ThemeToggle /><div className="question-counter">{t('resultFinal')}</div></div>
      </header>

      <main className="exam-container">
        <section className="question-card">
          {modoDiagnostico ? (
            <>
              <p className="eyebrow">{t('diagnostic')}</p>
              <h2 id="estado">{t('diagnosticTitle')}</h2>
              <p className="result-line">{t('diagnosticCopy')}</p>
            </>
          ) : (
            <>
              <h2 id="estado">{estado}</h2>
              <p className="result-line"><strong>{t('correctAnswers')}</strong> <span id="correctas">{correctas}</span></p>
              <p className="result-line"><strong>{t('percentage')}</strong> <span id="porcentaje">{porcentaje}</span>%</p>
            </>
          )}
        </section>

        {temasARevisar.length > 0 && (
          <section className="review-topics-card">
            <div className="mistakes-heading">
              <span>{modoDiagnostico ? t('diagnostic') : t('personalized')}</span>
              <h2>{modoDiagnostico ? t('reviewTopics') : t('reinforceTopics')}</h2>
              <p>{t('reviewCopy')}</p>
            </div>
            <div className="review-topics-list">
              {temasARevisar.map((tema) => (
                <article className="review-topic" key={tema.tema}>
                  <strong>{tema.tema}</strong>
                  <span>{tema.errores} {tema.errores === 1 ? t('answerToReinforce') : t('answersToReinforce')}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {errores.length > 0 && (
          <section className="mistakes-card">
            <div className="mistakes-heading">
              <span>{t('reviewAnswers')}</span>
              <h2>{t('missedQuestions')}</h2>
              <p>{t('missedCopy')}</p>
            </div>
            <div className="mistakes-list">
              {errores.map((error, index) => (
                <article className="mistake-item" key={`${error.id_pregunta}-${index}`}>
                  <span className="mistake-number">{index + 1}</span>
                  <div>
                    <h3>{error.enunciado}</h3>
                    <p><strong>{t('yourAnswer')}</strong> {error.respuesta_usuario}</p>
                    <p className="correct-answer"><strong>{t('correctAnswer')}</strong> {error.respuesta_correcta}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="navigation-buttons">
          <button className="secondary-btn" onClick={() => navigate('/examenes')}>{t('backToExams')}</button>
          <button className="primary-btn" onClick={() => navigate('/examen')}>{t('repeat')}</button>
        </section>
      </main>
    </div>
  );
}

function ChapterSelectionPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [capitulos, setCapitulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJson(`/api/examen/capitulos?lang=${language}`)
      .then((data) => setCapitulos(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error('Error cargando capítulos:', err);
        setError(t('chaptersLoadError'));
      })
      .finally(() => setLoading(false));
  }, [language]);

  function chooseChapter(chapterId) {
    localStorage.setItem('selectedExamType', 'chapter');
    localStorage.setItem('selectedChapterId', chapterId);
    localStorage.setItem('id_examen', '1');
    navigate('/examen');
  }

  return (
    <div className="category-page">
      <TopNav />
      <main className="exam-container">
      <section className="question-card">
        <h2>{t('chapterSelection')}</h2>
        <p>{t('chapterSelectionCopy')}</p>

        {loading && <p>{t('loadingChapters')}</p>}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && capitulos.length === 0 && (
          <p>
            {t('noChapterQuestions')}
          </p>
        )}

        {!loading && capitulos.length > 0 && (
          <div className="category-list">
            {capitulos.map((item) => (
              <button
                key={item.id}
                type="button"
                className="option category-option"
                onClick={() => chooseChapter(item.id)}
              >
                <strong><i className="fas fa-book-open" /> {t('chapter')} {item.numero}: {item.titulo}</strong>
                <span>{item.total_preguntas} {t('questionsAvailable')}{item.descripcion ? ` · ${item.descripcion}` : ''}</span>
              </button>
            ))}
          </div>
        )}

        <div className="navigation-buttons category-actions">
          <button className="secondary-btn" onClick={() => navigate('/examenes')}>{t('back')}</button>
        </div>
      </section>
      </main>
    </div>
  );
}

function ReadinessGauge({ title, value }) {
  const { t } = useLanguage();
  const percent = clampPercent(value);
  const color = readinessColor(percent);

  return (
    <article className="panel readiness-panel">
      <div className="panel-header compact">
        <h3>{title}</h3>
        <span>{percent}%</span>
      </div>
      <div className="readiness-ring" style={{ background: `conic-gradient(${color} 0 ${percent}%, rgba(143, 110, 218, 0.12) ${percent}% 100%)` }}>
        <div className="readiness-ring-inner">
          <strong>{percent}%</strong>
        </div>
      </div>
      <p className="readiness-description">{t('readinessDescription')}</p>
    </article>
  );
}

function TopicProgressBar({ label, value, index }) {
  const percent = clampPercent(value);
  const color = readinessColor(percent);
  const safeIndex = index % 5;
  const accentColors = ['#f79d65', '#8f6eda', '#5ec7d6', '#34c38f', '#f6b94d'];

  return (
    <div className="topic-progress-row">
      <div className="topic-progress-meta">
        <span>{label}</span>
        <strong>{percent}%</strong>
      </div>
      <div className="topic-progress-bar">
        <span style={{ width: `${percent}%`, background: accentColors[safeIndex] || color }} />
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`msg-row ${isUser ? 'user' : ''}`}>
      {!isUser && <div className="msg-avatar connie-portrait" role="img" aria-label="Connie" />}
      <div className={`bubble ${isUser ? 'user' : 'connie'}`}>{message.text}</div>
      {isUser && <div className="msg-avatar"><i className="fas fa-user" /></div>}
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="msg-row">
      <div className="msg-avatar connie-portrait" role="img" aria-label="Connie" />
      <div className="bubble connie typing"><span /><span /><span /></div>
    </div>
  );
}

function TopNav() {
  const { t } = useLanguage();
  const loggedIn = Boolean(localStorage.getItem('id_usuario') && localStorage.getItem('usuario'));
  return (
    <header className="navbar">
      <BrandLogo />
      <nav className="top-links" aria-label="Primary navigation">
        {loggedIn && <NavLink to="/examenes"><i className="fas fa-clipboard-check" /><span>{t('exams')}</span></NavLink>}
        {loggedIn && <NavLink to="/connie"><i className="fas fa-comments" /><span>Connie</span></NavLink>}
        <NavLink to="/manual"><i className="fas fa-book-open" /><span>{t('manual')}</span></NavLink>
      </nav>
      <ThemeToggle />
    </header>
  );
}

function ThemeToggle() {
  const { language, setLanguage, t } = useLanguage();
  const getInitialTheme = () => localStorage.getItem('driveprep-theme')
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('driveprep-theme', theme);
  }, [theme]);

  const isDark = theme === 'dark';
  return (
    <div className="preference-controls">
      <button
        className="theme-toggle"
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label={isDark ? t('enableLight') : t('enableDark')}
      >
        <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
        <span className="theme-toggle-label">{isDark ? t('light') : t('dark')}</span>
      </button>
      <button
        className="language-toggle"
        type="button"
        onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
        aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}
      >
        {language === 'es' ? t('english') : t('spanish')}
      </button>
    </div>
  );
}

function BrandLogo({ compact = false }) {
  const { t } = useLanguage();
  return (
    <Link to="/" className={`logo${compact ? ' logo-compact' : ''}`} aria-label={t('homeAria')}>
      <img src="/static/assets/drivepreplogo.png" alt="DrivePrep" className="logo-img" />
      <span className="logo-text">DrivePrep</span>
    </Link>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <article className="stat-card">
      <h3>{title}</h3>
      <p>{value}</p>
      <span>{subtitle}</span>
    </article>
  );
}

function ActionCard({ title, icon, accent, onClick, children }) {
  return (
    <button className={`action-card ${accent}`} onClick={onClick}>
      <i className={`fas ${icon}`} aria-hidden="true" />
      <span><strong>{title}</strong><small>{children}</small></span>
      <i className="fas fa-arrow-right action-arrow" aria-hidden="true" />
    </button>
  );
}

function CenteredMessage({ title }) {
  const { t } = useLanguage();
  return (
    <div className="status-page">
      <TopNav />
      <main className="exam-container">
        <section className="question-card centered-message">
          <h2>{title}</h2>
          <Link to="/" className="secondary-pill">{t('backHome')}</Link>
        </section>
      </main>
    </div>
  );
}

export default App;
