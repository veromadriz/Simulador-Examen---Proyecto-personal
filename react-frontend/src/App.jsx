import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
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
      <Route path="/examenes" element={<ExamsPage />} />
      <Route path="/connie" element={<ConniePage />} />
      <Route path="/manual" element={<ManualPage />} />
      <Route path="/manual/:capituloId" element={<ManualChapterPage />} />
      <Route path="/examen" element={<ExamPage />} />
      <Route path="/resultados" element={<ResultsPage />} />
      <Route path="/chapter-selection" element={<ChapterSelectionPage />} />
      <Route path="/category-selection" element={<Navigate to="/chapter-selection" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></LanguageProvider>
  );
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
  }, [idUsuario]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function loadStats(userId) {
    try {
      const data = await fetchJson(`/estadisticas/${userId}`);
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
        setToast(`Bienvenido, ${data.nombre} 😌`);
        setModalOpen(false);
        setForm({ nombre: '', email: '', password: '' });
        return;
      }

      await fetchJson('/register', {
        method: 'POST',
        body: JSON.stringify({ nombre: form.nombre, email: form.email, password: form.password })
      });

      setToast('Cuenta creada 😌 ahora inicia sesión');
      setIsLogin(true);
      setForm({ nombre: '', email: '', password: '' });
    } catch (error) {
      window.alert(error.message || 'No se pudo completar la acción.');
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
    <div>
      <header className="navbar navbar-home">
        <BrandLogo />
        <div className="nav-right">
          <ThemeToggle />
          {!loggedIn && <button className="nav-btn" onClick={() => { setIsLogin(true); setModalOpen(true); }}>Iniciar sesión</button>}
          {!loggedIn && <button className="nav-btn" onClick={() => { setIsLogin(false); setModalOpen(true); }}>Registrarse</button>}
          {loggedIn && (
            <div id="nav-usuario" style={{ display: 'flex' }}>
              <span id="user-name">{usuario}</span>
              <button id="logout-btn" className="nav-btn logout" onClick={logout}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </header>

      <section className="hero-home">
        <p className="eyebrow">Simulador teórico de manejo</p>
        <h1>{loggedIn ? `Hola, ${usuario} 😌` : 'Practica, mide tu progreso y aprueba con seguridad'}</h1>
        <p className="hero-copy">
          Una interfaz más limpia en React para estudiar, hacer exámenes y revisar tus avances sin perder el flujo.
        </p>
        <div className="hero-actions">
          <button className="primary-pill" onClick={() => navigate('/examenes')}>Ir a exámenes</button>
          <button className="secondary-pill" onClick={() => navigate('/manual')}>Ver manual</button>
        </div>
      </section>

      {loggedIn && (
        <>
          <section className="stats-grid">
            <StatCard title="Exámenes" value={stats.examenes} subtitle="hechos y aprobados" />
            <StatCard title="Promedio" value={`${stats.promedio}%`} subtitle="preparación" />
            <StatCard title="Temas" value={stats.temas} subtitle="con avance" />
          </section>

          <section className="dashboard-visuals">
            <ReadinessGauge title="Preparación total" value={stats.promedio} />

            <div className="dashboard-side">
              <article className="panel topic-panel">
                <div className="panel-header">
                  <h3>Preparación por tema</h3>
                  <span>{stats.topicos.length} temas</span>
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
                  <p className="empty-state">Completa un examen con preguntas por capítulo para ver tu nivel por tema.</p>
                )}
              </article>

              <article className="panel review-panel">
                <div className="panel-header">
                  <h3>Temas para revisar</h3>
                  <span>Top 3</span>
                </div>

                {topReviewTopics.length > 0 ? (
                  <ol className="review-list">
                    {topReviewTopics.map((topic, index) => (
                      <li key={topic.id ?? `${topic.titulo}-${index}`} className="review-item">
                        <div className="review-rank">#{index + 1}</div>
                        <div className="review-content">
                          <strong>{topic.titulo}</strong>
                          <span>{Math.round(Number(topic.puntaje || 0))}% de preparación</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="empty-state">Haz un examen para que te recomendemos los temas más importantes a reforzar.</p>
                )}
              </article>
            </div>
          </section>
        </>
      )}

      <section className="actions-grid">
        <ActionCard title="Exámenes" accent="accent-orange" onClick={() => navigate('/examenes')} locked={!loggedIn}>
          Prueba tu conocimiento
        </ActionCard>
        <ActionCard title="Chatbot" accent="accent-purple" onClick={() => navigate('/connie')} locked={!loggedIn}>
          Pregúntale a Connie
        </ActionCard>
        <ActionCard title="Manual" accent="accent-pink" onClick={() => navigate('/manual')} locked={!loggedIn}>
          Leer manual
        </ActionCard>
        <ActionCard title="Práctico" accent="accent-green" onClick={() => window.open('https://www.drivingskillsforlife.com/media/games/vr2pc/sub/roundabout/index.html', '_blank')} locked={!loggedIn}>
          Simulación
        </ActionCard>
      </section>

      {modalOpen && (
        <div className="modal" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
            <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
            {!isLogin && (
              <input value={form.nombre} onChange={(event) => setForm((current) => ({ ...current, nombre: event.target.value }))} placeholder="Nombre" />
            )}
            <input value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="Correo" type="email" />
            <input value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} placeholder="Contraseña" type="password" />
            <button className="primary-pill full-width" onClick={submitForm}>{isLogin ? 'Entrar' : 'Crear cuenta'}</button>
            <button className="text-link" onClick={() => setIsLogin((current) => !current)}>
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      )}

      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}

function ExamsPage() {
  const navigate = useNavigate();
  const idUsuario = localStorage.getItem('id_usuario');
  const [stats, setStats] = useState({ examenes: 0, promedio: 0, temas: 0 });

  useEffect(() => {
    if (!idUsuario) return;

    fetchJson(`/estadisticas/${idUsuario}`)
      .then((data) => setStats({
        examenes: data.total_examenes ?? 0,
        promedio: data.promedio ?? 0,
        temas: 0
      }))
      .catch((error) => console.error('Error cargando estadísticas:', error));
  }, [idUsuario]);

  const cards = [
    { title: 'Diagnóstico', icon: 'fa-stethoscope', cls: 'blue', text: 'Descubre qué temas necesitas reforzar.', action: () => startExam('diagnostic') },
    { title: 'Examen Extremo', icon: 'fa-fire', cls: 'purple', text: 'El desafío más difícil de DrivePrep.', action: () => startExam('extreme') },
    { title: 'Por Capítulo', icon: 'fa-book', cls: 'green', text: 'Practica exclusivamente el capítulo que elijas.', action: () => navigate('/chapter-selection') },
    { title: 'Aleatorio', icon: 'fa-dice', cls: 'orange', text: 'Una mezcla sorpresa de preguntas.', action: () => startExam('random') }
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
        <h1>Elige tu tipo de examen</h1>
        <p>Pon a prueba tus conocimientos y descubre qué tan preparado estás.</p>
      </section>

      <section className="stats-grid exams-stats">
        <StatCard title="Exámenes realizados" value={stats.examenes} subtitle="intentados en total" />
        <StatCard title="Promedio" value={`${stats.promedio}%`} subtitle="rendimiento general" />
        <StatCard title="Temas" value={stats.temas} subtitle="dominados" />
      </section>

      <section className="exam-cards-grid">
        {cards.map((card) => (
          <article className={`exam-card ${card.cls}`} key={card.title}>
            <i className={`fas ${card.icon}`} />
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <button onClick={card.action}>Comenzar</button>
          </article>
        ))}
      </section>

      <section className="panel recommendation-panel">
        <h3>🎯 Recomendación personalizada</h3>
        <p>Te recomendamos practicar Señales de tránsito antes de intentar otro examen completo.</p>
      </section>
    </main>
  );
}

function ConniePage() {
  const chatBodyRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: 'connie', text: '¡Hola! Soy tu asistente virtual de autoescuela retro. ¿En qué puedo ayudarte hoy?' }
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

    setMessages((current) => [...current, { role: 'user', text }]);
    setInput('');
    setSending(true);

    try {
      const data = await fetchJson('/api/connie', {
        method: 'POST',
        body: JSON.stringify({ message: text })
      });

      setMessages((current) => [...current, { role: 'connie', text: data.reply || 'No entendí tu mensaje.' }]);
    } catch (error) {
      setMessages((current) => [...current, { role: 'connie', text: 'No pude responder en este momento.' }]);
      console.error(error);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-shell">
      <header className="chat-header">
        <BrandLogo compact />
        <div className="header-title">
          <div className="header-avatar">🚗</div>
          Pregúntale a Connie
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
            placeholder="Pregúntale algo a Connie…"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') sendMessage(); }}
          />
          <button className="send-btn" id="send-btn" onClick={sendMessage} disabled={sending}>➤</button>
        </div>
      </div>
    </div>
  );
}

// ─── Manual: mini-app propia con lista de capítulos + página por capítulo ──

function ManualPage() {
  const [capitulos, setCapitulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJson('/api/manual/capitulos')
      .then((data) => {
        if (!data.ok) throw new Error(data.error || 'No se pudo cargar el manual.');
        setCapitulos(data.capitulos || []);
      })
      .catch((err) => {
        console.error('Error cargando el manual:', err);
        setError('No se pudo cargar el manual. Verificá que la migración de base de datos esté aplicada.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="manual-page page-shell">
      <TopNav />
      <section className="panel hero-panel">
        <p className="eyebrow">Guía de estudio</p>
        <h1>Manual de DrivePrep</h1>
        <p>Cada capítulo del manual del conductor tiene su propia página, como una mini-app dentro de DrivePrep.</p>
      </section>

      {loading && <CenteredMessage title="Cargando capítulos…" />}
      {!loading && error && <CenteredMessage title={error} />}

      {!loading && !error && (
        <section className="manual-grid">
          {capitulos.map((capitulo) => (
            <Link key={capitulo.id} to={`/manual/${capitulo.id}`} className="panel info-card chapter-card">
              <span className="chapter-icon">{capitulo.icono || '📘'}</span>
              <h2>{capitulo.titulo}</h2>
              <p>{capitulo.descripcion}</p>
              <span className="chapter-meta">{capitulo.total_secciones ?? 0} secciones</span>
            </Link>
          ))}

          {capitulos.length === 0 && (
            <article className="panel info-card">
              <h2>Todavía no hay capítulos</h2>
              <p>Corré la migración <code>migrations/001_categorias_y_manual.sql</code> para crear contenido de ejemplo.</p>
            </article>
          )}
        </section>
      )}
    </main>
  );
}

function ManualChapterPage() {
  const { t } = useLanguage();
  const { capituloId } = useParams();
  const navigate = useNavigate();
  const [capitulo, setCapitulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchJson(`/api/manual/capitulos/${capituloId}`)
      .then((data) => {
        if (!data.ok) throw new Error(data.error || 'Capítulo no encontrado.');
        setCapitulo(data.capitulo);
      })
      .catch((err) => {
        console.error('Error cargando el capítulo:', err);
        setError(err.message || 'No se pudo cargar este capítulo.');
      })
      .finally(() => setLoading(false));
  }, [capituloId]);

  if (loading) return <CenteredMessage title="Cargando capítulo…" />;
  if (error) return <CenteredMessage title={error} />;
  if (!capitulo) return null;

  const secciones = capitulo.secciones || [];
  const featuredTopics = secciones.slice(0, 3).map((seccion) => seccion.subtitulo).filter(Boolean);

  return (
    <main className="manual-page page-shell">
      <TopNav />
      <button className="secondary-pill" onClick={() => navigate('/manual')}>← Volver al manual</button>

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
            <p>Este capítulo todavía no tiene secciones cargadas.</p>
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
        <span>{seccion.subtitulo || `Tema ${index + 1}`}</span>
        <span className="section-toggle" aria-hidden="true">⌄</span>
      </summary>
      <div className="manual-section-content">
        <div className="exam-focus">
          <span>{t('examFocus')}</span>
          <p>{paragraphs[0] || 'Repasá las ideas principales de este tema.'}</p>
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
    loadQuestions();
  }, []);

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
      const params = new URLSearchParams({ type: examType });

      if (examType === 'chapter') {
        const chapterId = localStorage.getItem('selectedChapterId');
        if (chapterId) params.set('capitulo_id', chapterId);
      }

      const data = await fetchJson(`/api/examen/questions?${params.toString()}`);

      if (!Array.isArray(data) || data.length === 0) {
        setError('No hay preguntas disponibles para esta selección.');
        setLoading(false);
        return;
      }

      setQuestions(data);
      setLoading(false);
    } catch (caughtError) {
      console.error('Error cargando preguntas:', caughtError);
      setError('Error al cargar las preguntas.');
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
          respuestas
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
      window.alert('No se pudo guardar el resultado del examen.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <CenteredMessage title="Cargando pregunta..." />;
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
          <div className="title-icon" />
          <h1 id="exam-title">Quiz Final</h1>
        </div>
        <div className="header-right">
          <ThemeToggle />
          <div className="timer-pill">⏱️ <span id="timer">{timeRemaining}s</span></div>
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
          <button className="secondary-btn" id="prev-btn" onClick={prevQuestion} disabled={currentIndex === 0}>Anterior</button>
          <button className="primary-btn" id="next-btn" onClick={nextQuestion} disabled={submitting}>{currentIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente'}</button>
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
      ? '🎉 ¡Aprobaste el examen!'
      : '❌ No aprobaste el examen'
    : 'No se encontraron resultados.';

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
                  <span>{tema.errores} {tema.errores === 1 ? 'respuesta por reforzar' : 'respuestas por reforzar'}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {errores.length > 0 && (
          <section className="mistakes-card">
            <div className="mistakes-heading">
              <span>Revisa tus respuestas</span>
              <h2>Preguntas por reforzar</h2>
              <p>Estas son las respuestas que no coincidieron con la respuesta correcta.</p>
            </div>
            <div className="mistakes-list">
              {errores.map((error, index) => (
                <article className="mistake-item" key={`${error.id_pregunta}-${index}`}>
                  <span className="mistake-number">{index + 1}</span>
                  <div>
                    <h3>{error.enunciado}</h3>
                    <p><strong>Tu respuesta:</strong> {error.respuesta_usuario}</p>
                    <p className="correct-answer"><strong>Respuesta correcta:</strong> {error.respuesta_correcta}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="navigation-buttons">
          <button className="secondary-btn" onClick={() => navigate('/examenes')}>Volver a exámenes</button>
          <button className="primary-btn" onClick={() => navigate('/examen')}>Repetir examen</button>
        </section>
      </main>
    </div>
  );
}

function ChapterSelectionPage() {
  const navigate = useNavigate();
  const [capitulos, setCapitulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJson('/api/examen/capitulos')
      .then((data) => setCapitulos(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error('Error cargando capítulos:', err);
        setError('No se pudieron cargar los capítulos.');
      })
      .finally(() => setLoading(false));
  }, []);

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
        <h2>Selección de Capítulo</h2>
        <p>Elige un capítulo del manual para preparar tu siguiente examen.</p>

        {loading && <p>Cargando capítulos…</p>}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && capitulos.length === 0 && (
          <p>
            Todavía no hay capítulos en el manual. Corré la migración{' '}
            <code>migrations/001_categorias_y_manual.sql</code> para crear el contenido inicial.
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
                <strong>{item.icono} Capítulo {item.numero}: {item.titulo}</strong>
                <span>{item.total_preguntas} preguntas disponibles{item.descripcion ? ` · ${item.descripcion}` : ''}</span>
              </button>
            ))}
          </div>
        )}

        <div className="navigation-buttons category-actions">
          <button className="secondary-btn" onClick={() => navigate('/examenes')}>Volver</button>
        </div>
      </section>
      </main>
    </div>
  );
}

function ReadinessGauge({ title, value }) {
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
      <p className="readiness-description">Tu nivel actual de preparación se refleja en la media de tus exámenes realizados.</p>
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
      {!isUser && <div className="msg-avatar">🚗</div>}
      <div className={`bubble ${isUser ? 'user' : 'connie'}`}>{message.text}</div>
      {isUser && <div className="msg-avatar">🧑</div>}
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="msg-row">
      <div className="msg-avatar">🚗</div>
      <div className="bubble connie typing"><span /><span /><span /></div>
    </div>
  );
}

function TopNav() {
  const { t } = useLanguage();
  return (
    <header className="navbar">
        <BrandLogo />
      <div className="top-links">
        <Link to="/examenes">{t('exams')}</Link>
        <Link to="/connie">Connie</Link>
        <Link to="/manual">{t('manual')}</Link>
      </div>
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
        aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      >
        <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
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
  return (
    <Link to="/" className={`logo${compact ? ' logo-compact' : ''}`} aria-label="Ir a la página principal de DrivePrep">
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

function ActionCard({ title, accent, onClick, locked, children }) {
  return (
    <article className={`action-card ${accent}`}>
      <h2>{title}</h2>
      <div className="card-content">
        <button className={`action-button ${locked ? 'disabled' : ''}`} onClick={locked ? undefined : onClick} disabled={locked}>
          {locked ? `🔒 ${children}` : children}
        </button>
      </div>
    </article>
  );
}

function CenteredMessage({ title }) {
  return (
    <div className="status-page">
      <TopNav />
      <main className="exam-container">
        <section className="question-card centered-message">
          <h2>{title}</h2>
          <Link to="/" className="secondary-pill">Volver al inicio</Link>
        </section>
      </main>
    </div>
  );
}

export default App;
