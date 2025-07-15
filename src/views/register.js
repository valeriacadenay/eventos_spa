import { alertError, alertSuccess } from '../js/alert.js';
import { registerUserApi } from '../js/api.js';

export default function register(div) {
  div.innerHTML = `
    <h2>Registro</h2>
    <form id="registerForm">
      <input type="text" id="nombre" placeholder="Nombre completo" required>
      <input type="text" id="username" placeholder="Usuario" required />
      <input type="password" id="password" placeholder="Contraseña" required />
      <button type="submit">Registrarse</button>
      <p class="login-link">
        ¿Ya tienes una cuenta? <a href="/login" id="go-to-login">Inicia Sesión</a>
    </form>
  `;

  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const newUser = {
      nombre,
      username,
      password,
      role: "user"
    };

    try {
      //veryfy if user already exists
      let response = await fetch(`http://localhost:3000/users?username=${username}`);
      let data = await response.json();
      if (data.length > 0) {
        alertError("Este usuario ya está registrado. Inicia sesión.");
        history.pushState({}, "", "/login");
        location.reload();
        return;
      }
      // Register new user
      await registerUserApi(newUser);
      alertSuccess("Registro exitoso. Ahora inicia sesión.");
      history.pushState({}, "", "/login");
      location.reload();
    } catch (error) {
      alertError("Error al registrar usuario.");
      console.error(error);
    }
  });
}
