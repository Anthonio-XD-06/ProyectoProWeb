document.getElementById('dashboard-btn').addEventListener('click', mostrarDashboard);
document.getElementById('simulador-btn').addEventListener('click', mostrarSimulador);
document.getElementById('agregar-tarjeta-btn').addEventListener('click', mostrarAgregarTarjeta);
document.getElementById('compras-btn').addEventListener('click', mostrarCompras);

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
                <button onclick="mostrarComprasTarjeta('${tarjeta.nombre}')">Ver Compras</button>
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

    // Recuperar las tarjetas del localStorage
    let tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];

    // Buscar la tarjeta en la que se registrará la compra
    const tarjeta = tarjetas.find(tarjeta => tarjeta.nombre === nombreTarjeta);
    
    if (!tarjeta) {
        alert('Tarjeta no encontrada.');
        return;
    }

    // Registrar la compra en la tarjeta
    if (!tarjeta.compras) {
        tarjeta.compras = []; // Si no tiene compras, inicializar el array
    }
    tarjeta.compras.push({ monto, fechaCompra });

    // Guardar nuevamente las tarjetas con la compra agregada
    localStorage.setItem('tarjetas', JSON.stringify(tarjetas));

    // Confirmación
    document.getElementById('mensaje-guardar-compra').innerHTML = `Compra de $${monto} registrada correctamente.`;
    setTimeout(() => {
        mostrarDashboard(); // Volver al dashboard después de registrar la compra
    }, 1500);
}
