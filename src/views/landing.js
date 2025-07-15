import { renderNav, navEvents } from '../components/nav.js';
import { isAuthenticated, getCurrentUser } from '../utils/auth.js';
import dashboardAdmin from './dashbordAdmin.js';
import dashboardUser from './dashboardUser.js';

export default function home(div) {

  if (isAuthenticated()) {
    const user = getCurrentUser();
    history.pushState({}, "", "/dashboard");
    
  
    if (user.role === "admin") {
      dashboardAdmin(div);
    } else {
      dashboardUser(div);
    }
    return; 
  }


  div.innerHTML = `
    ${renderNav()}
    <section class="events-landing">
      <h1>Eventos</h1>

      <a href="/login" data-link ><button>Iniciar Sesión</button></a>
      <a href="/register" data-link><button>Registrarse</button></a>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <div class="events-list">
        <article class="event">
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Fecha: 20 de julio de 2025</p>
          <p>Hora: 18:00</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <a href="/register?event=webinar-estudio" data-link><button>Inscribirse</button></a>
        </article>
        <article class="event">
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Fecha: 25 de julio de 2025</p>
          <p>Hora: 17:00</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <a href="/register?event=taller-docentes" data-link><button>Inscribirse</button></a>
        </article>
        <article class="event">
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Fecha: 30 de julio de 2025</p>
          <p>Hora: 19:00</p>
          <p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></p>
          <a href="/register?event=seminario-innovacion" data-link><button>Inscribirse</button></a>
        </article>
      </div>
    </section>
  `;

  navEvents();
}
