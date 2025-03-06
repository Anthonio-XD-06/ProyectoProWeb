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
        <p>¿Ya tienes cuenta? <a href="#" onclick="mostrarLogin()">Iniciar Sesión</a></p>
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
        document.getElementById('mensaje-registro').innerText = 'El correo ya está registrado.';
        return;
    }

    localStorage.setItem(correo, JSON.stringify({ password }));
    document.getElementById('mensaje-registro').innerText = 'Registro exitoso. Inicia sesión.';
}

function iniciarSesion() {
    const correo = document.getElementById('login-correo').value;
    const password = document.getElementById('login-password').value;

    const usuario = JSON.parse(localStorage.getItem(correo));

    if (usuario && usuario.password === password) {
        localStorage.setItem('usuarioLogueado', correo);
        mostrarDashboard();
    } else {
        document.getElementById('mensaje-login').innerText = 'Credenciales incorrectas.';
    }
}

function verificarSesion() {
    if (!localStorage.getItem('usuarioLogueado')) {
        mostrarLogin();
    }
}

window.onload = verificarSesion;
