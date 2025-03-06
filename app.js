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
// Variables para almacenar las tarjetas
let tarjetas = [];

// Enlazamos el formulario para agregar tarjeta
document.getElementById('form-agregar-tarjeta').addEventListener('submit', agregarTarjeta);

// Función para agregar tarjeta
function agregarTarjeta(e) {
    e.preventDefault(); // Prevenir comportamiento por defecto de submit

    // Obtener los valores del formulario
    const monto = parseFloat(document.getElementById('monto-tarjeta').value);
    const interes = parseFloat(document.getElementById('interes-tarjeta').value);
    const plazo = parseInt(document.getElementById('plazo-tarjeta').value);

    // Validar que los campos no estén vacíos o incorrectos
    if (isNaN(monto) || isNaN(interes) || isNaN(plazo) || monto <= 0 || interes <= 0 || plazo <= 0) {
        alert('Por favor, ingresa valores válidos.');
        return;
    }

    // Agregar la tarjeta al arreglo
    tarjetas.push({ monto, interes, plazo });

    // Limpiar los campos del formulario
    document.getElementById('monto-tarjeta').value = '';
    document.getElementById('interes-tarjeta').value = '';
    document.getElementById('plazo-tarjeta').value = '';

    // Mostrar la lista actualizada de tarjetas
    mostrarTarjetas();
}

// Función para mostrar las tarjetas en la lista
function mostrarTarjetas() {
    const listaTarjetas = document.getElementById('lista-tarjetas');
    listaTarjetas.innerHTML = '';

    tarjetas.forEach((tarjeta, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Tarjeta ${index + 1}</strong><br>
            Monto: $${tarjeta.monto} | Tasa: ${tarjeta.interes}% | Plazo: ${tarjeta.plazo} meses
            <button onclick="mostrarSimulador(${index})">Ver Simulador</button>
        `;
        listaTarjetas.appendChild(li);
    });
}

// Función para mostrar el simulador de una tarjeta seleccionada
function mostrarSimulador(index) {
    const tarjeta = tarjetas[index];

    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Simulador de la Tarjeta ${index + 1}</h2>
        <p>Introduce los detalles de tu deuda para calcular el pago mensual.</p>
        <form id="simulador-form">
            <label for="monto">Monto de la deuda ($):</label>
            <input type="number" id="monto" value="${tarjeta.monto}" required>
            
            <label for="interes">Tasa de interés anual (%):</label>
            <input type="number" id="interes" value="${tarjeta.interes}" required>
            
            <label for="plazo">Plazo (meses):</label>
            <input type="number" id="plazo" value="${tarjeta.plazo}" required>
            
            <button type="submit">Calcular Pago</button>
        </form>
        
        <div id="resultado-simulador" style="margin-top: 20px;"></div>
    `;

    // Evento para calcular el pago mensual
    document.getElementById('simulador-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto de submit

        // Obtener los valores del formulario
        const monto = parseFloat(document.getElementById('monto').value);
        const interes = parseFloat(document.getElementById('interes').value);
        const plazo = parseInt(document.getElementById('plazo').value);

        // Validar que los campos no estén vacíos o incorrectos
        if (isNaN(monto) || isNaN(interes) || isNaN(plazo) || monto <= 0 || interes <= 0 || plazo <= 0) {
            alert('Por favor, ingresa valores válidos.');
            return;
        }

        // Llamar a la función para calcular el pago mensual
        const resultado = calcularPagoMensual(monto, interes, plazo);

        // Mostrar el resultado
        document.getElementById('resultado-simulador').innerHTML = `
            <p><strong>Pago mensual:</strong> $${resultado.pagoMensual.toFixed(2)}</p>
            <p><strong>Total a pagar:</strong> $${resultado.totalPagar.toFixed(2)}</p>
        `;
    });
}

// Función para calcular el pago mensual de la deuda
function calcularPagoMensual(monto, interes, plazo) {
    const tasaInteresMensual = (interes / 100) / 12;
    const pagoMensual = monto * (tasaInteresMensual * Math.pow(1 + tasaInteresMensual, plazo)) / (Math.pow(1 + tasaInteresMensual, plazo) - 1);
    const totalPagar = pagoMensual * plazo;
    
    return {
        pagoMensual: pagoMensual,
        totalPagar: totalPagar
    };
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

function mostrarSimulador() {
    verificarSesion(); // Asegúrate de que el usuario esté logueado.
    
    const content = document.getElementById('content');
    
    // Generamos el contenido del simulador
    content.innerHTML = `
        <h2>Simulador de Pagos de Tarjeta</h2>
        <p>Introduce los detalles de tu deuda para calcular el pago mensual.</p>
        <form id="simulador-form">
            <label for="monto">Monto de la deuda ($):</label>
            <input type="number" id="monto" placeholder="Introduce el monto de la deuda" required>
            
            <label for="interes">Tasa de interés anual (%):</label>
            <input type="number" id="interes" placeholder="Introduce la tasa de interés anual" required>
            
            <label for="plazo">Plazo (meses):</label>
            <input type="number" id="plazo" placeholder="Introduce el número de meses" required>
            
            <button type="submit">Calcular Pago</button>
        </form>
        
        <div id="resultado-simulador" style="margin-top: 20px;"></div>
    `;

    // Evento para calcular el pago mensual
    document.getElementById('simulador-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto de submit

        // Obtener los valores del formulario
        const monto = parseFloat(document.getElementById('monto').value);
        const interes = parseFloat(document.getElementById('interes').value);
        const plazo = parseInt(document.getElementById('plazo').value);

        // Validar que los campos no estén vacíos o incorrectos
        if (isNaN(monto) || isNaN(interes) || isNaN(plazo) || monto <= 0 || interes <= 0 || plazo <= 0) {
            alert('Por favor, ingresa valores válidos.');
            return;
        }

        // Llamar a la función para calcular el pago mensual
        const resultado = calcularPagoMensual(monto, interes, plazo);

        // Mostrar el resultado
        document.getElementById('resultado-simulador').innerHTML = `
            <p><strong>Pago mensual:</strong> $${resultado.pagoMensual.toFixed(2)}</p>
            <p><strong>Total a pagar:</strong> $${resultado.totalPagar.toFixed(2)}</p>
        `;
    });
}

// Función para calcular el pago mensual de la deuda
function calcularPagoMensual(monto, interes, plazo) {
    const tasaInteresMensual = (interes / 100) / 12;
    const pagoMensual = monto * (tasaInteresMensual * Math.pow(1 + tasaInteresMensual, plazo)) / (Math.pow(1 + tasaInteresMensual, plazo) - 1);
    const totalPagar = pagoMensual * plazo;
    
    return {
        pagoMensual: pagoMensual,
        totalPagar: totalPagar
    };
}

// Resto de las funciones...
function cerrarSesion() {
    localStorage.removeItem('sesion');
    alert('Has cerrado sesión correctamente.');
    window.location.href = 'login.html'; // Redirigir a la página de login después de cerrar sesión
}
