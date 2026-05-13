const API_BASE =
    window.location.origin && window.location.origin !== "null"
        ? window.location.origin
        : "http://127.0.0.1:5000";

/**
 * Inicia un examen.
 */
function startExam(type) {
    localStorage.setItem("selectedExamType", type);

    // Usar el examen general creado en la base
    localStorage.setItem("id_examen", 1);

    window.location.href = "/examen";
}

/**
 * Navega a la selección por categoría.
 */
function selectCategory() {
    window.location.href = "/category-selection";
}

/**
 * Carga estadísticas del usuario.
 */
async function cargarEstadisticas() {
    const idUsuario = localStorage.getItem("id_usuario");

    if (!idUsuario) {
        console.warn("No hay id_usuario en localStorage.");
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE}/estadisticas/${idUsuario}`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        const mejorNota = document.getElementById("mejor-nota");
        const totalExamenes = document.getElementById("total-examenes");
        const promedio = document.getElementById("promedio");

        if (mejorNota) {
            mejorNota.textContent = `${data.mejor_nota}%`;
        }

        if (totalExamenes) {
            totalExamenes.textContent = data.total_examenes;
        }

        if (promedio) {
            promedio.textContent = `${data.promedio}%`;
        }

    } catch (error) {
        console.error("Error cargando estadísticas:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarEstadisticas();
});