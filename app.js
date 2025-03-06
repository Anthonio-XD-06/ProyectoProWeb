document.getElementById('dashboard-btn').addEventListener('click', mostrarDashboard);
document.getElementById('simulador-btn').addEventListener('click', mostrarSimulador);
document.getElementById('agregar-tarjeta-btn').addEventListener('click', mostrarAgregarTarjeta);

function mostrarLogin() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <label>Correo: <input type="email" id="login-correo"></label>
        <label>Contraseña: <input type="password" id="login-password"></label>
        <button onclick="iniciarSesion()">Iniciar Sesión</button>
        <p>¿No tienes cuenta? <a href="#" onclick="mostrarRegistro()">Regístrate</a></p>
        <div id="mensaje-login"></div>
    `;
}

function mostrarRegistro() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Registro</h2>
        <label>Correo: <input type="email" id="registro-correo"></label>
        <label>Contraseña: <input type="password" id="registro-password"></label>
        <button onclick="registrarUsuario()">Registrarse</button>
        <p>¿Ya tienes cuenta? <a href="#" onclick="mostrarLogin()">Inicia Sesión</a></p>
        <div id="mensaje-registro"></div>
    `;
}

function registrarUsuario() {
    const correo = document.getElementById('registro-correo').value;
    const password = document.getElementById('registro-password').value;

    if (!correo || !password) {
        alert('Completa todos los campos.');
        return;
    }

    if (localStorage.getItem(correo)) {
        document.getElementById('mensaje-registro').innerText = 'Este correo ya está registrado.';
        return;
    }

    const usuario = {
        correo: correo,
        password: password
    };

    localStorage.setItem(correo, JSON.stringify(usuario));
    document.getElementById('mensaje-registro').innerText = 'Registro exitoso. Ahora puedes iniciar sesión.';
}

function iniciarSesion() {
    const correo = document.getElementById('login-correo').value;
    const password = document.getElementById('login-password').value;

    const usuarioGuardado = localStorage.getItem(correo);

    if (!usuarioGuardado) {
        document.getElementById('mensaje-login').innerText = 'Correo no registrado.';
        return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    if (usuario.password === password) {
        document.getElementById('mensaje-login').innerText = 'Inicio de sesión exitoso.';
        setTimeout(mostrarDashboard, 1000); // Simula redirección al dashboard
    } else {
        document.getElementById('mensaje-login').innerText = 'Contraseña incorrecta.';
    }
}

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

window.onload = function() {
    mostrarLogin();
};
