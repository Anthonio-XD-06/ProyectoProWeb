document.getElementById('dashboard-btn').addEventListener('click', mostrarDashboard);
document.getElementById('simulador-btn').addEventListener('click', mostrarSimulador);
document.getElementById('agregar-tarjeta-btn').addEventListener('click', mostrarAgregarTarjeta);

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
    document.getElementById('resultado-simulador').innerHTML = `<p>Pago mensual: <strong>$${mensualidad.toFixed(2)}</strong></p>`;
}

function mostrarAgregarTarjeta() {
    verificarSesion();
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Agregar Tarjeta</h2>
        <label>Nombre de la tarjeta: <input type="text" id="nombre-tarjeta"></label>
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

    // Recuperar las tarjetas del localStorage
    let tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];

    // Agregar la nueva tarjeta al arreglo
    tarjetas.push({ nombre, fechaCorte: fecha });

    // Guardar el nuevo arreglo de tarjetas en el localStorage
    localStorage.setItem('tarjetas', JSON.stringify(tarjetas));

    // Confirmación y recarga de dashboard
    document.getElementById('mensaje-guardar').innerHTML = `Tarjeta "${nombre}" guardada con fecha de corte ${fecha}.`;
    mostrarDashboard();
}

function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    mostrarLogin();
}

verificarSesion();
