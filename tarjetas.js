let tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];

function agregarTarjeta(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre-tarjeta').value;
    const monto = parseFloat(document.getElementById('monto-tarjeta').value);
    const interes = parseFloat(document.getElementById('interes-tarjeta').value);
    const plazo = parseInt(document.getElementById('plazo-tarjeta').value);
    const fechaCorte = document.getElementById('fecha-corte-tarjeta').value;

    const nuevaTarjeta = { nombre, monto, interes, plazo, fechaCorte };

    const tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
    tarjetas.push(nuevaTarjeta);
    localStorage.setItem('tarjetas', JSON.stringify(tarjetas));

    mostrarListaDeTarjetas();
    document.getElementById('form-agregar-tarjeta').reset();
}

function mostrarListaDeTarjetas() {
    const tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
    const listaTarjetas = document.getElementById('lista-tarjetas');
    listaTarjetas.innerHTML = '';

    tarjetas.forEach((tarjeta, index) => {
        const li = document.createElement('li');
        li.innerHTML = `Tarjeta: ${tarjeta.nombre} - Monto: $${tarjeta.monto}`;
        listaTarjetas.appendChild(li);
    });
}
