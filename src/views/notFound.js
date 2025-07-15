export default function notFound(div) {
  div.innerHTML = `
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la ruta solicitada no existe.</p>
    <a href="/">Volver al inicio</a>
  `;
}
