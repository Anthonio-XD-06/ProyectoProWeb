document.getElementById('dashboard-btn').addEventListener('click', mostrarDashboard);
document.getElementById('simulador-btn').addEventListener('click', mostrarSimulador);
document.getElementById('agregar-tarjeta-btn').addEventListener('click', mostrarAgregarTarjeta);

function mostrarDashboard() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Dashboard Financiero</h2>
        <p>Aquí verás tus tarjetas, pagos próximos y fechas de corte.</p>
        <div class="tarjeta-grid">
            <!-- Aquí puedes meter tarjetas dinámicas después -->
            <div class="tarjeta-card">Tarjeta 1 - Fecha corte: 15/03/2025</div>
            <div class="tarjeta-card">Tarjeta 2 - Fecha corte: 22/03/2025</div>
        </div>
    `;
}

function mostrarSimulador() {
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

    document.getElementById('mensaje-guardar').innerHTML = `<p>Tarjeta "${nombre}" guardada correctamente con fecha de corte ${fecha}.</p>`;
}
