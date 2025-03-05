document.addEventListener("DOMContentLoaded", () => {
  // Cargar Dashboard al inicio
  mostrarDashboard();

  // Eventos para los botones de menú
  document.getElementById("dashboard-btn").addEventListener("click", mostrarDashboard);
  document.getElementById("simulador-btn").addEventListener("click", mostrarSimulador);
  document.getElementById("agregar-tarjeta-btn").addEventListener("click", mostrarAgregarTarjeta);
});
// Datos simulados (esto normalmente vendría del backend)
const tarjetas = [
  {
      id: 1,
      nombre: "Visa Santander",
      saldo: 12500,
      fechaCorte: "15/03/2025",
      proximoPago: 2000,
      fechaPago: "20/03/2025"
  },
  {
      id: 2,
      nombre: "BBVA Oro",
      saldo: 5000,
      fechaCorte: "10/03/2025",
      proximoPago: 1500,
      fechaPago: "15/03/2025"
  }
];
function mostrarDashboard() {
  const content = document.getElementById("content");
  
  let totalSaldo = tarjetas.reduce((total, t) => total + t.saldo, 0);
  let totalPagos = tarjetas.reduce((total, t) => total + t.proximoPago, 0);
  
  const fechaActual = new Date().toLocaleDateString();
  const fechasCorte = tarjetas.map(t => t.fechaCorte);
  const fechaCorteProxima = fechasCorte.sort()[0];  // La más próxima (sólo simulación)

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

      <h3>Alertas</h3>
      <div class="alertas">
          ${generarAlertas()}
      </div>
  `;
}
function generarAlertas() {
  let alertas = "";
  const hoy = new Date();
  
  tarjetas.forEach(t => {
      const fechaPago = new Date(t.fechaPago);
      const diasRestantes = Math.ceil((fechaPago - hoy) / (1000 * 60 * 60 * 24));

      if (diasRestantes <= 5) {
          alertas += `<p>🚨 El pago de ${t.nombre} vence en ${diasRestantes} días.</p>`;
      }
  });

  return alertas || "<p>✅ No hay alertas pendientes.</p>";
}


function mostrarSimulador() {
  document.getElementById('content').innerHTML = `
      <h2>Simulador de Préstamos</h2>
      <form>
          <label>Monto:</label><input type="number" id="monto">
          <label>Plazo (meses):</label><input type="number" id="plazo">
          <label>Interés Anual (%):</label><input type="number" id="interes">
          <button type="button" onclick="calcularPrestamo()">Calcular</button>
      </form>
      <div id="resultado-simulador"></div>
  `;
}

function calcularPrestamo() {
  const monto = parseFloat(document.getElementById('monto').value);
  const plazo = parseInt(document.getElementById('plazo').value);
  const interes = parseFloat(document.getElementById('interes').value) / 100 / 12;

  const cuota = (monto * interes) / (1 - Math.pow(1 + interes, -plazo));
  const total = cuota * plazo;
  const intereses = total - monto;

  document.getElementById('resultado-simulador').innerHTML = `
      <p>Pago Mensual: $${cuota.toFixed(2)}</p>
      <p>Total Pagado: $${total.toFixed(2)}</p>
      <p>Intereses Totales: $${intereses.toFixed(2)}</p>
  `;
}

function mostrarAgregarTarjeta() {
  document.getElementById('content').innerHTML = `
      <h2>Agregar Tarjeta</h2>
      <form>
          <label>Nombre:</label><input type="text" id="nombreTarjeta">
          <label>Saldo Inicial:</label><input type="number" id="saldoInicial">
          <label>Fecha de Corte:</label><input type="date" id="fechaCorte">
          <button type="button" onclick="agregarTarjeta()">Guardar Tarjeta</button>
      </form>
  `;
}

function agregarTarjeta() {
  alert('Esta función guardaría la tarjeta (puede conectarse al backend después).');
}

function verTarjeta(id) {
  alert(`Mostrando detalles de tarjeta con ID: ${id}`);
}
