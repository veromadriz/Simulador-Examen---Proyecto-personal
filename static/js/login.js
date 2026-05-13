const API_BASE = window.location.origin && window.location.origin !== "null"
    ? window.location.origin
    : "http://127.0.0.1:5000";
let isLogin = true;

const modal = document.getElementById("modal-login");
const openLogin = document.getElementById("btn-login");
const openRegister = document.getElementById("btn-register");
const closeBtn = document.getElementById("close-modal");

const title = document.getElementById("form-title");
const nombreInput = document.getElementById("register-nombre");
const emailInput = document.getElementById("form-email");
const passwordInput = document.getElementById("form-password");
const submitBtn = document.getElementById("submit-btn");
const toggle = document.getElementById("toggle-form");

const navUsuario = document.getElementById("nav-usuario");
const userName = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");

/* ABRIR MODAL */
openLogin.onclick = () => {
    isLogin = true;
    updateForm();
    modal.style.display = "flex";
};

openRegister.onclick = () => {
    isLogin = false;
    updateForm();
    modal.style.display = "flex";
};

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

/* CAMBIAR LOGIN/REGISTER */
toggle.onclick = () => {
    isLogin = !isLogin;
    updateForm();
};

function updateForm() {
    if (isLogin) {
        title.innerText = "Iniciar sesión";
        submitBtn.innerText = "Entrar";
        nombreInput.style.display = "none";
        toggle.innerText = "¿No tienes cuenta? Regístrate";
    } else {
        title.innerText = "Registrarse";
        submitBtn.innerText = "Crear cuenta";
        nombreInput.style.display = "block";
        toggle.innerText = "¿Ya tienes cuenta? Inicia sesión";
    }
}

/* SUBMIT */
submitBtn.onclick = async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (isLogin) {
        // LOGIN
        const res = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("usuario", data.nombre);
            localStorage.setItem("id_usuario", data.id_usuario);
            mostrarToast(`Bienvenido, ${data.nombre} 😌`);
            actualizarUI();
            modal.style.display = "none";
            emailInput.value = "";
            passwordInput.value = "";
        } else {
            alert(data.message);
        }

    } else {
        // REGISTER
        const nombre = nombreInput.value;

        const res = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, password })
        });

        const data = await res.json();

        if (data.success) {
            mostrarToast("Cuenta creada 😌 ahora inicia sesión");
            isLogin = true;
            updateForm();
            nombreInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";
        } else {
            alert(data.message);
        }
    }
};

/* LOGOUT */
logoutBtn.onclick = () => {
    localStorage.removeItem("usuario");
    location.reload();
};

/* TOAST */
function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.innerText = mensaje;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

async function cargarStats() {
    try {
        const response = await fetch(`${API_BASE}/api/examen/stats`);
        if (!response.ok) return;
        const stats = await response.json();

        const elExamenes = document.getElementById("stat-examenes");
        const elPromedio = document.getElementById("stat-promedio");
        const elTemas = document.getElementById("stat-temas");

        if (elExamenes) elExamenes.textContent = stats.examenes ?? 0;
        if (elPromedio) elPromedio.textContent = (stats.promedio ?? 0) + "%";
        if (elTemas) elTemas.textContent = stats.temas ?? 0;
    } catch (error) {
        console.error("Error cargando stats:", error);
    }
}

/* INIT */
window.onload = actualizarUI;

function actualizarUI() {
    const usuario = localStorage.getItem("usuario");
    const id_usuario = localStorage.getItem("id_usuario");
    const titulo = document.getElementById("welcome-title");
    const stats = document.getElementById("stats-section");
    const dashboard = document.querySelector(".dashboard");

    if (usuario) {
        // NAV
        document.getElementById("btn-login").style.display = "none";
        document.getElementById("btn-register").style.display = "none";

        navUsuario.style.display = "flex";
        userName.innerText = usuario;

        // TÍTULO
        titulo.innerText = `Hola, ${usuario} 😌`;

        // MOSTRAR STATS
        stats.style.display = "flex";

        // CAMBIAR MODO DASHBOARD
        dashboard.classList.add("logged-in");

        // DESBLOQUEAR
        document.querySelectorAll(".btn.disabled").forEach(btn => {
            btn.classList.remove("disabled");
            btn.innerText = btn.innerText.replace("🔒 ", "");
        });

        cargarStats(); // 👈 importante

    } else {
        document.getElementById("btn-login").style.display = "inline-block";
        document.getElementById("btn-register").style.display = "inline-block";

        navUsuario.style.display = "none";

        titulo.innerText = "Bienvenida a DrivePrep 🚗";

        // OCULTAR STATS
        stats.style.display = "none";

        // VOLVER A MODO NORMAL
        dashboard.classList.remove("logged-in");

        // BLOQUEAR
        document.querySelectorAll(".btn").forEach(btn => {
            if (!btn.classList.contains("disabled")) {
                btn.classList.add("disabled");

                if (!btn.innerText.includes("🔒")) {
                    btn.innerText = "🔒 " + btn.innerText;
                }
            }
        });
    }
}