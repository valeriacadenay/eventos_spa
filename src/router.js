// Import all views and authentication utilities
import login from './views/login.js';
import register from './views/register.js';
import dashboardAdmin from './views/dashbordAdmin.js';
import dashboardStudent from './views/dashboardUser.js';
import home from './views/landing.js';
import notFound from './views/notFound.js';
import { isAuthenticated, getCurrentUser } from './utils/auth.js';

// Main SPA router function
export default function lol(div) {
  console.log("Router ejecutándose");

  // Get current path and user info
  const path = window.location.pathname;
  const user = getCurrentUser();

  console.log("Path:", path);
  console.log("isAuthenticated:", isAuthenticated());
  console.log("User:", user);

  // If not authenticated and trying to access dashboard, redirect to home
  if (!isAuthenticated() && path === "/dashboard") {
    console.log("No autenticado en dashboard. Redirigiendo a landing.");
    history.replaceState({}, "", "/");
    home(div);
    return;
  }

  // If authenticated, prevent access to login/register and redirect to dashboard
  if (isAuthenticated() && (path === "/login" || path === "/register")) {
    console.log("Ya autenticado, redirigiendo a dashboard");
    history.replaceState({}, "", "/dashboard");
  }

  // Route handling based on path
  switch (path) {
    case "/":
      // Render home page
      console.log("Renderizando home");
      home(div);
      break;
    case "/login":
      // Render login page
      console.log("Renderizando login");
      login(div);
      break;
    case "/register":
      // Render register page
      console.log("Renderizando register");
      register(div);
      break;
    case "/dashboard":
      // Render dashboard for admin or user
      console.log("Renderizando dashboard");
      if (user && user.role === "admin") {
        dashboardAdmin(div);
      } else if (user && user.role === "user") {
        dashboardStudent(div);
      } else {
        // Invalid user role, redirect to home
        console.log("Usuario sin rol válido, redirigiendo a home");
        history.replaceState({}, "", "/");
        home(div);
      }
      break;
    default:
      // Render 404 not found page
      console.log("Ruta no encontrada, renderizando notFound");
      notFound(div);
  }
}