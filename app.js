document.addEventListener('DOMContentLoaded', verificarSesion);

// Enlaces de botones
document.getElementById('dashboard-btn').addEventListener('click', mostrarDashboard);
document.getElementById('simulador-btn').addEventListener('click', mostrarSimuladorGeneral);
document.getElementById('agregar-tarjeta-btn').addEventListener('click', mostrarFormularioAgregarTarjeta);
document.getElementById('compras-btn').addEventListener('click', mostrarRegistrarCompra);
document.getElementById('cerrar-sesion-btn').addEventListener('click', cerrarSesion);
document.getElementById('ver-tarjetas-btn').addEventListener('click', mostrarTarjetas);
document.getElementById('ver-compras-btn').addEventListener('click', mostrarCompras);
document.getElementById('volver-btn').addEventListener('click', volverAlDashboard);

document.getElementById('form-agregar-tarjeta').addEventListener('submit', agregarTarjeta);

function verificarSesion() {
    const sesion = localStorage.getItem('sesion');
    if (!sesion) {
        alert('Por favor, inicie sesión primero.');
        window.location.href = 'login.html';
    } else {
        document.querySelectorAll('.menu-btn').forEach(btn => btn.style.display = 'block');
    }
}

function volverAlDashboard() {
    mostrarDashboard();
}

function cerrarSesion() {
    localStorage.removeItem('sesion');
    alert('Has cerrado sesión correctamente.');
    window.location.href = 'login.html';
}
