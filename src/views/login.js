import { loginUser } from '../utils/auth.js';
import dashboardAdmin from './dashbordAdmin.js';
import dashboardStudent from './dashboardUser.js';
import { alertError } from '../js/alert.js';

export default function login(div) {
    div.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <input type="text" id="username" placeholder="Usuario" required />
      <input type="password" id="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>
  `;

    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const res = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
        const data = await res.json();

        if (data.length) {
            loginUser(data[0]);
            const user = data[0];

            // change URL to dashboard
            history.pushState({}, "", "/dashboard");

            // render dashboard based on user role
            if (user.role === "admin") {
                dashboardAdmin(div);
            } else {
                dashboardStudent(div);
            }

        } else {
            alertError("Credenciales inválidas");
        }
    });
}
