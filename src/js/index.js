// Entry point for SPA: mounts router and handles navigation
import lol from "../router.js";

const app = document.getElementById("app");

// Listen to browser navigation (back/forward)
window.addEventListener("popstate", () => lol(app));
// Initial page load
document.addEventListener("DOMContentLoaded", () => lol(app));
