/*// Enlace a los botones
document.getElementById('dashboard-btn').addEventListener('click', mostrarDashboard);
document.getElementById('simulador-btn').addEventListener('click', mostrarSimulador);
document.getElementById('agregar-tarjeta-btn').addEventListener('click', mostrarAgregarTarjeta);
document.getElementById('compras-btn').addEventListener('click', mostrarRegistrarCompra);
document.getElementById('cerrar-sesion-btn').addEventListener('click', cerrarSesion);

document.getElementById('ver-tarjetas-btn').addEventListener('click', mostrarTarjetas);
document.getElementById('ver-compras-btn').addEventListener('click', mostrarCompras);
document.getElementById('volver-btn').addEventListener('click', volverAlDashboard);

function verificarSesion() {
    const sesion = localStorage.getItem('sesion');
    if (!sesion) {
        alert('Por favor, inicie sesión primero.');
        window.location.href = 'login.html'; // Redirigir a la página de login si no está logueado
    }
}

function volverAlDashboard() {
    mostrarDashboard(); // Regresa al Dashboard
}

function mostrarDashboard() {
    verificarSesion();
    const content = document.getElementById('content');
    const tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
    
    let tarjetaHTML = '';
    tarjetas.forEach(tarjeta => {
        tarjetaHTML += `
            <div class="tarjeta-card">
                <p>Tarjeta: ${tarjeta.nombre} - Fecha de Corte: ${tarjeta.fechaCorte}</p>
                <button onclick="mostrarRegistrarCompra('${tarjeta.nombre}')">Registrar Compra</button>
            </div>
        `;
    });

    content.innerHTML = `
        <h2>Dashboard Financiero</h2>
        <p>Aquí verás tus tarjetas, pagos próximos y fechas de corte.</p>
        <div class="tarjeta-grid">
            ${tarjetaHTML}
        </div>
    `;
    document.getElementById('volver-btn').style.display = 'none'; // Esconder el botón "Volver" en el Dashboard
}

// Resto de las funciones...

function cerrarSesion() {
    localStorage.removeItem('sesion');
    alert('Has cerrado sesión correctamente.');
    window.location.href = 'login.html'; // Redirigir a la página de login después de cerrar sesión
}
*/

// Enlace a los botones
document.getElementById('dashboard-btn').addEventListener('click', mostrarDashboard);
document.getElementById('simulador-btn').addEventListener('click', mostrarSimulador);
document.getElementById('agregar-tarjeta-btn').addEventListener('click', mostrarAgregarTarjeta);
document.getElementById('compras-btn').addEventListener('click', mostrarRegistrarCompra);
document.getElementById('cerrar-sesion-btn').addEventListener('click', cerrarSesion);

document.getElementById('ver-tarjetas-btn').addEventListener('click', mostrarTarjetas);
document.getElementById('ver-compras-btn').addEventListener('click', mostrarCompras);
document.getElementById('volver-btn').addEventListener('click', volverAlDashboard);

function verificarSesion() {
    const sesion = localStorage.getItem('sesion');
    if (!sesion) {
        alert('Por favor, inicie sesión primero.');
        window.location.href = 'login.html'; // Redirigir a la página de login si no está logueado
    } else {
        // Si hay sesión, mostrarlos los botones
        document.getElementById('dashboard-btn').style.display = 'block';
        document.getElementById('simulador-btn').style.display = 'block';
        document.getElementById('agregar-tarjeta-btn').style.display = 'block';
        document.getElementById('compras-btn').style.display = 'block';
        document.getElementById('cerrar-sesion-btn').style.display = 'block';
        document.getElementById('ver-tarjetas-btn').style.display = 'block';
        document.getElementById('ver-compras-btn').style.display = 'block';
    }
}

function volverAlDashboard() {
    mostrarDashboard(); // Regresa al Dashboard
}

function mostrarDashboard() {
    verificarSesion();
    const content = document.getElementById('content');
    const tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
    
    let tarjetaHTML = '';
    tarjetas.forEach(tarjeta => {
        tarjetaHTML += `
            <div class="tarjeta-card">
                <p>Tarjeta: ${tarjeta.nombre} - Fecha de Corte: ${tarjeta.fechaCorte}</p>
                <button onclick="mostrarRegistrarCompra('${tarjeta.nombre}')">Registrar Compra</button>
            </div>
        `;
    });

    content.innerHTML = `
        <h2>Dashboard Financiero</h2>
        <p>Aquí verás tus tarjetas, pagos próximos y fechas de corte.</p>
        <div class="tarjeta-grid">
            ${tarjetaHTML}
        </div>
    `;
    document.getElementById('volver-btn').style.display = 'none'; // Esconder el botón "Volver" en el Dashboard
}

// Resto de las funciones...
function cerrarSesion() {
    localStorage.removeItem('sesion');
    alert('Has cerrado sesión correctamente.');
    window.location.href = 'login.html'; // Redirigir a la página de login después de cerrar sesión
}
