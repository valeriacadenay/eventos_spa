import { getevents, createevent, updateevent, deleteevent } from '../js/api.js';
import { adminGuard } from '../utils/guards.js';
import { navEvents, renderNav } from '../components/nav.js';
import { alertError, alertSuccess } from '../js/alert.js';

export default async function dashboardAdmin(div) {
  // Protect view for admin only
  adminGuard();

  let events = await getevents();

  div.innerHTML = `
    ${renderNav()}
    <h2 id="tituloAdmin">Dashboard Admin</h2>
    <section id="adminSection">
    <h3>Administrar Eventos</h3>
    <p>Desde aquí puedes crear, editar y eliminar eventos y sus inscritos por id.</p>
    </section>

    <h3 id="formTitle">Crear nuevo Evento</h3>
    <form id="eventForm">
      <input type="hidden" id="eventId" />
      <input type="text" id="titulo" placeholder="Título" required />
      <input type="text" id="descripcion" placeholder="Descripción" required />
      <input type="text" id="categoria" placeholder="Categoría" required />
      <input type="text" id="instructor" placeholder="Instructor" required />
      <input type="number" id="capacidad" placeholder="Capacidad máxima" required />
      <button type="submit" id="submitBtn">Crear Curso</button>
    </form>

    <h3>Listado de Eventos</h3>
    <div id="eventsContainer">
      ${events.map(event => `
        <div class="event-admin-card">
          <h4>${event.titulo}</h4>
          <p>${event.descripcion}</p>
          <p>Categoría: ${event.categoria}</p>
          <p>Instructor: ${event.instructor}</p>
          <p>Capacidad máxima: ${event.capacidad}</p>
          <p>Inscritos (${event.inscritos ? event.inscritos.length : 0}): ${event.inscritos && event.inscritos.length ? event.inscritos.join(", ") : "Ninguno"}</p>
          <button class="editBtn" data-id="${event.id}">Editar</button>
          <button class="deleteBtn" data-id="${event.id}">Eliminar</button>
        </div>
      `).join("")}
    </div>
  `;

  // Attach logout event to button in nav
  navEvents();

 // Variables for editing
  let editingeventId = null;

  const form = document.getElementById("eventForm");
  const formTitle = document.getElementById("formTitle");
  const submitBtn = document.getElementById("submitBtn");
  const eventIdInput = document.getElementById("eventId");

  // Edit course: upload data to the form
  document.querySelectorAll(".editBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const event = events.find(e => e.id == id);
      if (!event) {
        alertError("Evento no encontrado");
        return;
      }
      editingeventId = id;
      eventIdInput.value = id;
      document.getElementById("titulo").value = event.titulo;
      document.getElementById("descripcion").value = event.descripcion;
      document.getElementById("categoria").value = event.categoria;
      document.getElementById("instructor").value = event.instructor;
      document.getElementById("capacidad").value = event.capacidad;
      formTitle.textContent = "Editar evento";
      submitBtn.textContent = "Actualizar Evento";
    });
  });

// Create or update event
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    events = await getevents(); // refresh the list
    // Get form values
    const id = eventIdInput.value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const instructor = document.getElementById("instructor").value.trim();
    const capacidad = parseInt(document.getElementById("capacidad").value.trim());

    if (editingeventId) {
      // Editing event
      const eventToEdit = events.find(e => e.id == editingeventId);
      if (!eventToEdit) {
        alertError("Evento no encontrado");
        return;
      }
      const newevent = {
        titulo,
        descripcion,
        categoria,
        instructor,
        capacidad,
        inscritos: eventToEdit.inscritos || []
      };
      await updateevent(editingeventId, newevent);
      alertSuccess("Evento actualizado exitosamente.");
      editingeventId = null;
      eventIdInput.value = "";
      formTitle.textContent = "Crear nuevo evento";
      submitBtn.textContent = "Crear evento";
    } else {
      // Creating new event
      const newevent = {
        titulo,
        descripcion,
        categoria,
        instructor,
        capacidad,
        inscritos: []
      };
      await createevent(newevent);
      alertSuccess("Evento creado exitosamente.");
    }
    history.pushState({}, "", "/dashboard");
    location.reload();
  });

  // Delete event
  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const confirmDelete = confirm("¿Estás seguro de eliminar este evento?");
      if (!confirmDelete) return;
      await deleteevent(id);
      alertSuccess("Evento eliminado exitosamente.");
      history.pushState({}, "", "/dashboard");
      location.reload();
    });
  });
}