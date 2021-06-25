const btn_convert = document.getElementById('btn-convert');
let prices = document.getElementById('price-dolar');
let quality = document.getElementById('quantity');
let table = document.getElementById('table');

const validateValues = () => {
    if(prices.value.length === 0 || quality.value.length === 0) // valida que los inputs no esten vacios
        return false;
    if(isNaN(prices.value)  || isNaN(quality.value)) // valida que sean numeros
        return false;
    if(parseFloat(prices.value) <= 0 || parseFloat(quality.value) <= 0) // valida que los valores sean > 0.
        return false;
    return true; // si esta todo correcto.
}
 
const updateTable = () => { 
    const dolar = 73.16,
    IVA = .35;
    price = prices.value * quality.value;
    let tax = price * IVA;
    let total = price + tax;
    let cast = total * dolar;

    let html = 
    `<p>
        Entrada: $${price}<br>
        IVA: $${tax.toFixed(2)}<br>
        Dolar: $${dolar}<br>
        Peso ARG: $${cast.toFixed(2)}
    </p>`;
    table.innerHTML = html; // introduce las operaciones en el html.
}
const getValues = () => { // se activa al darle click a btn de convertir.
    if (validateValues() ){ // valida los campos
        updateTable(); // si esta todo ok, ejecuta la conversión.
    } else {
        alert('Por favor, complete correctamente.'); 
    }
}

btn_convert.addEventListener('click', getValues);
