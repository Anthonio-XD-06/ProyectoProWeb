document.addEventListener('DOMContentLoaded', function() {
    // Verifica si el usuario tiene sesión activa
    const sesion = JSON.parse(localStorage.getItem('sesion'));

    // Si no hay sesión activa, redirige al login
    if (!sesion) {
        window.location.href = 'login.html';
    } else {
        // Muestra el contenido del Dashboard
        document.getElementById('content').innerHTML = `
            <h2>Bienvenido, ${sesion.email}</h2>
            <button id="cerrar-sesion-btn">Cerrar Sesión</button>
        `;
    }

    // Evento para cerrar sesión
    document.getElementById('cerrar-sesion-btn').addEventListener('click', function() {
        // Eliminar la sesión
        localStorage.removeItem('sesion');
        // Redirigir al login
        window.location.href = 'login.html';
    });
});
