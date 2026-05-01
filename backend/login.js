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
        const res = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("usuario", data.nombre);
            mostrarToast(`Bienvenido, ${data.nombre} 😌`);
            actualizarUI();
            modal.style.display = "none";
        } else {
            alert(data.message);
        }

    } else {
        // REGISTER
        const nombre = nombreInput.value;

        const res = await fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, password })
        });

        const data = await res.json();

        if (data.success) {
            mostrarToast("Cuenta creada 😌 ahora inicia sesión");
            isLogin = true;
            updateForm();
        } else {
            alert(data.message);
        }
    }
};

/* UI USUARIO */
function actualizarUI() {
    const usuario = localStorage.getItem("usuario");

    if (usuario) {
        document.getElementById("btn-login").style.display = "none";
        document.getElementById("btn-register").style.display = "none";

        navUsuario.style.display = "flex";
        userName.innerText = usuario;

        // desbloquear botones
        document.querySelectorAll(".btn.disabled").forEach(btn => {
            btn.classList.remove("disabled");
            btn.innerText = btn.innerText.replace("🔒 ", "");
        });

    } else {
        document.getElementById("btn-login").style.display = "inline-block";
        document.getElementById("btn-register").style.display = "inline-block";

        navUsuario.style.display = "none";
    }
}

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

/* INIT */
window.onload = actualizarUI;