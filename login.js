function iniciarSesion() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        document.getElementById('mensaje-error').innerText = 'Por favor, completa todos los campos.';
        return;
    }

    // Aquí validamos con valores fijos para el ejemplo
    const emailGuardado = 'usuario@ejemplo.com';
    const passwordGuardada = '123456';

    if (email === emailGuardado && password === passwordGuardada) {
        localStorage.setItem('sesion', JSON.stringify({ email }));
        window.location.href = 'index.html';  // Redirige a la página principal
    } else {
        document.getElementById('mensaje-error').innerText = 'Correo o contraseña incorrectos.';
    }
}

function mostrarRegistro() {
    document.getElementById('login-form').style.display = 'none'; // Ocultar el login
    document.getElementById('registro-form').style.display = 'block'; // Mostrar el registro
}

function mostrarLogin() {
    document.getElementById('registro-form').style.display = 'none'; // Ocultar el registro
    document.getElementById('login-form').style.display = 'block'; // Mostrar el login
}

function registrarCuenta() {
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (email === '' || password === '' || confirmPassword === '') {
        document.getElementById('mensaje-registro').innerText = 'Por favor, completa todos los campos.';
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('mensaje-registro').innerText = 'Las contraseñas no coinciden.';
        return;
    }

    // Guardar el nuevo usuario (en un caso real deberías guardar en una base de datos)
    localStorage.setItem('sesion', JSON.stringify({ email }));
    alert('Cuenta registrada correctamente.');
    window.location.href = 'index.html'; // Redirige a la página principal después de registrar la cuenta
}
