document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("usuario")) {
        mostrarApp();
    } else {
        mostrarLogin();
    }
});

// --- AUTENTICACIÓN ---

function mostrarLogin() {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("register-container").style.display = "none";
    document.getElementById("app-container").style.display = "none";
}

function mostrarRegistro() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("register-container").style.display = "block";
}

function mostrarApp() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("register-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
    mostrarDashboard();
}

function registrar() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    if (localStorage.getItem(email)) {
        alert("Este correo ya está registrado.");
        return;
    }

    // Guardar usuario en localStorage
    localStorage.setItem(email, JSON.stringify({ password }));
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    mostrarLogin();
}

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const usuario = JSON.parse(localStorage.getItem(email));

    if (!usuario || usuario.password !== password) {
        alert("Correo o contraseña incorrectos.");
        return;
    }

    localStorage.setItem("usuario", email);
    mostrarApp();
}

function logout() {
    localStorage.removeItem("usuario");
    mostrarLogin();
}

// --- DASHBOARD ---

const tarjetas = [
    { id: 1, nombre: "Visa Santander", saldo: 12500, fechaCorte: "15/03/2025", proximoPago: 2000, fechaPago: "20/03/2025" },
    { id: 2, nombre: "BBVA Oro", saldo: 5000, fechaCorte: "10/03/2025", proximoPago: 1500, fechaPago: "15/03/2025" }
];

document.getElementById("dashboard-btn").addEventListener("click", mostrarDashboard);
document.getElementById("simulador-btn").addEventListener("click", mostrarSimulador);
document.getElementById("agregar-tarjeta-btn").addEventListener("click", mostrarAgregarTarjeta);

function mostrarDashboard() {
    const content = document.getElementById("content");

    let totalSaldo = tarjetas.reduce((total, t) => total + t.saldo, 0);
    let totalPagos = tarjetas.reduce((total, t) => total + t.proximoPago, 0);

    const fechaActual = new Date().toLocaleDateString();
    const fechasCorte = tarjetas.map(t => t.fechaCorte).sort();
    const fechaCorteProxima = fechasCorte[0];

    content.innerHTML = `
        <h2>Dashboard</h2>
        <div class="resumen">
            <p>📅 Fecha actual: ${fechaActual}</p>
            <p>💳 Total Saldo: $${totalSaldo.toLocaleString()}</p>
            <p>📆 Próximos Pagos: $${totalPagos.toLocaleString()}</p>
            <p>🚨 Fecha de corte más cercana: ${fechaCorteProxima}</p>
        </div>
        <h3>Mis Tarjetas</h3>
        <div class="tarjeta-grid">
            ${tarjetas.map(t => `
                <div class="tarjeta-card">
                    <h4>${t.nombre}</h4>
                    <p>Saldo: $${t.saldo.toLocaleString()}</p>
                    <p>Fecha de corte: ${t.fechaCorte}</p>
                    <p>Próximo pago: $${t.proximoPago.toLocaleString()} - ${t.fechaPago}</p>
                    <button onclick="verTarjeta(${t.id})">Ver Detalles</button>
                </div>
            `).join("")}
        </div>
    `;
}

function mostrarSimulador() {
    document.getElementById("content").innerHTML = `<h2>Simulador de Préstamos</h2><p>Aquí irá el simulador...</p>`;
}

function mostrarAgregarTarjeta() {
    document.getElementById("content").innerHTML = `<h2>Agregar Tarjeta</h2><p>Formulario para agregar una nueva tarjeta...</p>`;
}

function verTarjeta(id) {
    const tarjeta = tarjetas.find(t => t.id === id);
    alert(`Detalles de ${tarjeta.nombre}\nSaldo: $${tarjeta.saldo}\nFecha de Corte: ${tarjeta.fechaCorte}\nPróximo Pago: $${tarjeta.proximoPago}`);
}
