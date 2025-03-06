function calcularPagoMensual(monto, interes, plazo) {
    const tasaMensual = (interes / 100) / 12;
    const pagoMensual = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
    return {
        pagoMensual,
        totalPagar: pagoMensual * plazo
    };
}

function mostrarSimuladorGeneral() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Simulador de Pagos</h2>
        <form id="simulador-form">
            <label>Monto:</label><input type="number" id="monto">
            <label>Interés:</label><input type="number" id="interes">
            <label>Plazo:</label><input type="number" id="plazo">
            <button type="submit">Calcular</button>
        </form>
        <div id="resultado-simulador"></div>
    `;

    document.getElementById('simulador-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const monto = parseFloat(document.getElementById('monto').value);
        const interes = parseFloat(document.getElementById('interes').value);
        const plazo = parseInt(document.getElementById('plazo').value);

        if (monto <= 0 || interes <= 0 || plazo <= 0) {
            alert('Valores inválidos.');
            return;
        }

        const { pagoMensual, totalPagar } = calcularPagoMensual(monto, interes, plazo);
        document.getElementById('resultado-simulador').innerHTML = `
            <p>Pago Mensual: $${pagoMensual.toFixed(2)}</p>
            <p>Total a Pagar: $${totalPagar.toFixed(2)}</p>
        `;
    });
}
