const modal = document.getElementById("modal-login");
const openBtn = document.getElementById("btn-login");
const closeBtn = document.getElementById("close-modal");

openBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

const loginBtn = document.getElementById("submit-login");

loginBtn.onclick = async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
        mostrarToast(`Bienvenido, ${data.nombre} 😌`);
        localStorage.setItem("usuario", data.nombre);

        desbloquearUI();

        modal.style.display = "none";
    } else {
        alert("Error: " + data.message);
    }
};

function desbloquearUI() {
    document.getElementById("user-name").innerText = localStorage.getItem("usuario");
    document.getElementById("logout-btn").style.display = "inline";

    document.querySelectorAll("#examenes a").forEach(link => {
        link.classList.remove("disabled");
        link.innerText = link.innerText.replace("🔒 ", "");
    });
}

function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.innerText = mensaje;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function cargarUsuario() {
    if (localStorage.getItem("usuario")) {
        desbloquearUI();
    }
}

window.onload = () => {
    cargarUsuario();

    document.getElementById("logout-btn").onclick = () => {
        localStorage.removeItem("usuario");
        location.reload();
    };
};