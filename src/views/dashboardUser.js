import { navEvents, renderNav } from '../components/nav.js';
import { getevents, updateevent } from '../js/api.js';
import { UserGuard } from '../utils/guards.js';
import { getCurrentUser } from '../utils/auth.js';
import { alertError, alertSuccess } from '../js/alert.js';

export default async function dashboardUser(div) {
  // Protects view only for users
  UserGuard();

  const events = await getevents();
  const user = getCurrentUser();

 // Filter courses the user is enrolled in
  const cursosInscritos = events.filter(event => event.inscritos && event.inscritos.includes(user.id));

  // Filter available courses that you are NOT enrolled in
  const cursosDisponibles = events.filter(event => !event.inscritos || !event.inscritos.includes(user.id));

  div.innerHTML = `
    ${renderNav()}
    <h2 id="tituloUser">Bienvenido </h2>

    <section id="userSection">
      <h3>Eventos en los que estás inscrito</h3>
      ${cursosInscritos.length ? `
        <div id="EventosInscritosContainer">
          ${cursosInscritos.map(event => `
            <div>
              <h4>${event.titulo}</h4>
              <p>${event.descripcion}</p>
              <p>Capacidad máxima: ${event.capacidad}</p>
              <p>Inscritos: ${event.inscritos.length}</p>
            </div>
          `).join("")}
        </div>
      ` : "<p>No estás inscrito en ningún curso.</p>"}
    </section>

    <section id="eventos-lista">
      <h3>Eventos Disponibles</h3>
      ${cursosDisponibles.length ? `
        <div id="eventsContainer">
          ${cursosDisponibles.map(event => `
            <div>
              <h4>${event.titulo}</h4>
              <p>${event.descripcion}</p>
              <p>Capacidad máxima: ${event.capacidad}</p>
              <p>Inscritos: ${event.inscritos ? event.inscritos.length : 0}</p>
              <button class="inscribirBtn" data-id="${event.id}">Inscribirme</button>
            </div>
          `).join("")}
        </div>
      ` : "<p>No hay cursos disponibles en este momento.</p>"}
    </section>
  `;

  navEvents();

// Enroll in course
  document.querySelectorAll(".inscribirBtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const curso = events.find(c => c.id == id);

      if (!curso.inscritos) curso.inscritos = [];
      if (curso.inscritos.includes(user.id)) {
        alertSuccess("Ya estás inscrito en este curso.");
        return;
      }

      if (curso.inscritos.length >= curso.capacidad) {
        alertError("El curso ya está lleno.");
        return;
      }

      curso.inscritos.push(user.id);
      await updateevent(id, curso);
      alertSuccess("Inscripción exitosa.");
      history.pushState({}, "", "/dashboard");
      location.reload();
    });
  });
}
