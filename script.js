function mostrarPantalla(idPantalla) {
  const pantallas = document.querySelectorAll('.screen');
  pantallas.forEach(pantalla => {
    pantalla.classList.remove('active');
  });

  const pantallaSeleccionada = document.getElementById(idPantalla);
  if (pantallaSeleccionada) {
    pantallaSeleccionada.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

const formCapsula = document.getElementById('capsuleForm');
const muroMensajes = document.getElementById('muroMensajes');

if (formCapsula && muroMensajes) {
  document.addEventListener('DOMContentLoaded', mostrarMensajesGuardados);

  formCapsula.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const grupo = document.getElementById('grupo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !grupo || !mensaje) return;

    const nuevoMensaje = { nombre, grupo, mensaje };
    const mensajes = JSON.parse(localStorage.getItem('mensajesCecytej')) || [];
    mensajes.unshift(nuevoMensaje);
    localStorage.setItem('mensajesCecytej', JSON.stringify(mensajes));

    formCapsula.reset();
    mostrarMensajesGuardados();
  });
}

function mostrarMensajesGuardados() {
  const mensajes = JSON.parse(localStorage.getItem('mensajesCecytej')) || [];
  muroMensajes.innerHTML = '';

  mensajes.forEach(item => {
    const div = document.createElement('div');
    div.className = 'saved-msg';
    div.innerHTML = `
      <strong>${item.nombre}</strong> <small>(${item.grupo})</small>
      <p>${item.mensaje}</p>
    `;
    muroMensajes.appendChild(div);
  });
}