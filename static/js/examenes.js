function startExam(type) {
  localStorage.setItem('selectedExamType', type);
  window.location.href = 'examen.html';
}

function selectCategory() {
  window.location.href = 'category-selection.html';
}

async function loadStats() {
  try {
    const response = await fetch('/api/examen/stats', {
      credentials: 'include'
    });

    if (!response.ok) return;

    const stats = await response.json();

    // Aquí puedes actualizar las tarjetas dinámicamente.
    console.log(stats);
  } catch (error) {
    console.error('Error cargando estadísticas:', error);
  }
}

loadStats();

fetch('/api/examen/questions?type=random')
  .then(res => res.json())
  .then(data => console.log(data));