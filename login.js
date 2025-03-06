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
