
// Enlace a los botones
document.getElementById('dashboard-btn').addEventListener('click', mostrarDashboard);
document.getElementById('simulador-btn').addEventListener('click', mostrarSimulador);
document.getElementById('agregar-tarjeta-btn').addEventListener('click', mostrarAgregarTarjeta);
document.getElementById('compras-btn').addEventListener('click', mostrarRegistrarCompra);
document.getElementById('cerrar-sesion-btn').addEventListener('click', cerrarSesion);

document.getElementById('ver-tarjetas-btn').addEventListener('click', mostrarTarjetas);
document.getElementById('ver-compras-btn').addEventListener('click', mostrarCompras);


function verificarSesion() {
    const sesion = localStorage.getItem('sesion');
    if (!sesion) {
        alert('Por favor, inicie sesión primero.');
        window.location.href = 'login.html'; // Redirigir a la página de login si no está logueado
    }
}
document.getElementById('volver-btn').addEventListener('click', volverAlDashboard);

function volverAlDashboard() {
    // Regresa al Dashboard
    mostrarDashboard(); // Esto redirige al dashboard cuando se hace clic en "Volver"
}


function mostrarDashboard() {
    verificarSesion();
    const content = document.getElementById('content');
    
    // Obtener las tarjetas guardadas del localStorage
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
}

function mostrarSimulador() {
    verificarSesion();
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Simulador de Préstamos y Compras</h2>
        <label>Monto: <input type="number" id="monto"></label>
        <label>Plazo (meses): <input type="number" id="plazo"></label>
        <label>Tasa de interés anual (%): <input type="number" id="interes"></label>
        <button onclick="calcularSimulacion()">Calcular</button>
        <div id="resultado-simulador"></div>
    `;
}

function calcularSimulacion() {
    const monto = parseFloat(document.getElementById('monto').value);
    const plazo = parseInt(document.getElementById('plazo').value);
    const interes = parseFloat(document.getElementById('interes').value) / 100;

    if (isNaN(monto) || isNaN(plazo) || isNaN(interes)) {
        alert('Por favor completa todos los campos correctamente.');
        return;
    }

    const mensualidad = (monto * interes / 12) / (1 - Math.pow(1 + interes / 12, -plazo));
    document.getElementById('resultado-simulador').innerHTML = `
        <p>Tu pago mensual sería: <strong>$${mensualidad.toFixed(2)}</strong></p>
    `;
}

function mostrarAgregarTarjeta() {
    verificarSesion();
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Agregar Tarjeta</h2>
        <label>Nombre: <input type="text" id="nombre-tarjeta"></label>
        <label>Fecha de corte: <input type="date" id="fecha-corte"></label>
        <button onclick="guardarTarjeta()">Guardar Tarjeta</button>
        <div id="mensaje-guardar"></div>
    `;
}

function guardarTarjeta() {
    const nombre = document.getElementById('nombre-tarjeta').value;
    const fecha = document.getElementById('fecha-corte').value;

    if (!nombre || !fecha) {
        alert('Completa todos los campos.');
        return;
    }

    let tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
    tarjetas.push({ nombre, fechaCorte: fecha, compras: [] });

    localStorage.setItem('tarjetas', JSON.stringify(tarjetas));

    document.getElementById('mensaje-guardar').innerHTML = `<p>Tarjeta "${nombre}" guardada correctamente con fecha de corte ${fecha}.</p>`;
    setTimeout(() => {
        mostrarDashboard(); // Volver al dashboard después de guardar la tarjeta
    }, 1500);
}

function mostrarRegistrarCompra(nombreTarjeta) {
    verificarSesion();
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Registrar Compra</h2>
        <label>Nombre de la tarjeta: <input type="text" id="nombre-tarjeta-compra" value="${nombreTarjeta}" disabled></label>
        <label>Monto de la compra: <input type="number" id="monto-compra" required></label>
        <label>Fecha de la compra: <input type="date" id="fecha-compra" required></label>
        <button onclick="guardarCompra('${nombreTarjeta}')">Registrar Compra</button>
        <div id="mensaje-guardar-compra"></div>
    `;
}

function guardarCompra(nombreTarjeta) {
    const monto = parseFloat(document.getElementById('monto-compra').value);
    const fechaCompra = document.getElementById('fecha-compra').value;

    if (!monto || !fechaCompra) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    let tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
    const tarjeta = tarjetas.find(tarjeta => tarjeta.nombre === nombreTarjeta);

    if (!tarjeta) {
        alert('Tarjeta no encontrada.');
        return;
    }

    if (!tarjeta.compras) {
        tarjeta.compras = [];
    }

    tarjeta.compras.push({ monto, fechaCompra });

    localStorage.setItem('tarjetas', JSON.stringify(tarjetas));

    document.getElementById('mensaje-guardar-compra').innerHTML = `Compra de $${monto} registrada correctamente.`;
    setTimeout(() => {
        mostrarDashboard(); // Volver al dashboard después de registrar la compra
    }, 1500);
}

function mostrarTarjetas() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Mis Tarjetas</h2>
        <div id="tarjetas-list">
            <!-- Lista de tarjetas -->
            <p>Tarjeta 1 - Fecha de corte: 15/03/2025</p>
            <p>Tarjeta 2 - Fecha de corte: 22/03/2025</p>
        </div>
    `;
    document.getElementById('volver-btn').style.display = 'block'; // Mostrar botón volver
}

function mostrarCompras() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Mis Compras</h2>
        <div id="compras-list">
            <!-- Lista de compras -->
            <p>Compra 1 - Monto: $500 - Fecha de pago: 25/03/2025</p>
            <p>Compra 2 - Monto: $200 - Fecha de pago: 12/04/2025</p>
        </div>
    `;
    document.getElementById('volver-btn').style.display = 'block'; // Mostrar botón volver
}

document.getElementById('dashboard-btn').addEventListener('click', mostrarDashboard);


function cerrarSesion() {
    localStorage.removeItem('sesion');
    alert('Has cerrado sesión correctamente.');
    window.location.href = 'login.html'; // Redirigir a la página de login después de cerrar sesión
}
