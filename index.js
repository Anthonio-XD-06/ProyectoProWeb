document.addEventListener('DOMContentLoaded', function() {
    // Verifica si el usuario tiene sesión activa
    const sesion = JSON.parse(localStorage.getItem('sesion'));

    // Si no hay sesión activa, redirige al login
    if (!sesion) {
        window.location.href = 'login.html';
    } else {
        // Muestra el contenido del Dashboard
        mostrarDashboard(sesion);
    }

    // Función para mostrar el Dashboard con las opciones
    function mostrarDashboard(sesion) {
        document.getElementById('content').innerHTML = `
            <h2>Bienvenido, ${sesion.email}</h2>
            <div>
                <button id="tarjetas-btn">Administrar Tarjetas</button>
                <button id="compras-btn">Registrar Compras</button>
                <button id="simulador-btn">Simular Compra/Préstamo</button>
                <button id="cerrar-sesion-btn">Cerrar Sesión</button>
            </div>
        `;

        // Agregar eventos a los botones
        document.getElementById('tarjetas-btn').addEventListener('click', mostrarTarjetas);
        document.getElementById('compras-btn').addEventListener('click', mostrarCompras);
        document.getElementById('simulador-btn').addEventListener('click', mostrarSimulador);
        document.getElementById('cerrar-sesion-btn').addEventListener('click', cerrarSesion);
    }

    // Función para cerrar sesión
    function cerrarSesion() {
        localStorage.removeItem('sesion');
        window.location.href = 'login.html';
    }

    // Función para mostrar la administración de tarjetas
    function mostrarTarjetas() {
        document.getElementById('content').innerHTML = `
            <h2>Administrar Tarjetas</h2>
            <button id="agregar-tarjeta-btn">Agregar Tarjeta</button>
            <div id="tarjetas-list"></div>
        `;

        document.getElementById('agregar-tarjeta-btn').addEventListener('click', agregarTarjeta);

        // Aquí podrías cargar las tarjetas del localStorage o de una base de datos
        const tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
        const tarjetasList = document.getElementById('tarjetas-list');
        tarjetas.forEach(tarjeta => {
            tarjetasList.innerHTML += `<p>Tarjeta: ${tarjeta.nombre} | Fecha de corte: ${tarjeta.fechaCorte}</p>`;
        });
    }

    // Función para agregar tarjeta
    function agregarTarjeta() {
        document.getElementById('content').innerHTML = `
            <h2>Agregar Nueva Tarjeta</h2>
            <label for="nombre-tarjeta">Nombre de la Tarjeta:</label>
            <input type="text" id="nombre-tarjeta">
            <label for="fecha-corte">Fecha de Corte:</label>
            <input type="date" id="fecha-corte">
            <button id="guardar-tarjeta-btn">Guardar Tarjeta</button>
        `;

        document.getElementById('guardar-tarjeta-btn').addEventListener('click', function() {
            const nombre = document.getElementById('nombre-tarjeta').value;
            const fechaCorte = document.getElementById('fecha-corte').value;

            if (!nombre || !fechaCorte) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            // Guardar tarjeta en localStorage
            const tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
            tarjetas.push({ nombre, fechaCorte });
            localStorage.setItem('tarjetas', JSON.stringify(tarjetas));

            alert('Tarjeta agregada correctamente!');
            mostrarTarjetas();  // Volver a mostrar el listado de tarjetas
        });
    }

    // Función para mostrar registrar compras
    function mostrarCompras() {
        document.getElementById('content').innerHTML = `
            <h2>Registrar Compra</h2>
            <label for="monto-compra">Monto de la Compra:</label>
            <input type="number" id="monto-compra">
            <label for="fecha-compra">Fecha de la Compra:</label>
            <input type="date" id="fecha-compra">
            <button id="guardar-compra-btn">Registrar Compra</button>
        `;

        document.getElementById('guardar-compra-btn').addEventListener('click', function() {
            const monto = document.getElementById('monto-compra').value;
            const fechaCompra = document.getElementById('fecha-compra').value;

            if (!monto || !fechaCompra) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            // Guardar compra en localStorage
            const compras = JSON.parse(localStorage.getItem('compras')) || [];
            compras.push({ monto, fechaCompra });
            localStorage.setItem('compras', JSON.stringify(compras));

            alert('Compra registrada correctamente!');
            mostrarCompras();  // Volver a mostrar la página de registrar compras
        });
    }

    // Función para simular préstamo/compra
    function mostrarSimulador() {
        document.getElementById('content').innerHTML = `
            <h2>Simulador de Préstamos y Compras</h2>
            <label for="monto">Monto:</label>
            <input type="number" id="monto">
            <label for="plazo">Plazo (meses):</label>
            <input type="number" id="plazo">
            <label for="interes">Tasa de interés anual (%):</label>
            <input type="number" id="interes">
            <button id="calcular-simulador-btn">Calcular</button>
            <div id="resultado-simulador"></div>
        `;

        document.getElementById('calcular-simulador-btn').addEventListener('click', function() {
            const monto = parseFloat(document.getElementById('monto').value);
            const plazo = parseInt(document.getElementById('plazo').value);
            const interes = parseFloat(document.getElementById('interes').value) / 100;

            if (isNaN(monto) || isNaN(plazo) || isNaN(interes)) {
                alert('Por favor, completa todos los campos correctamente.');
                return;
            }

            const mensualidad = (monto * interes / 12) / (1 - Math.pow(1 + interes / 12, -plazo));
            document.getElementById('resultado-simulador').innerHTML = `
                <p>Tu pago mensual sería: <strong>$${mensualidad.toFixed(2)}</strong></p>
            `;
        });
    }
});
