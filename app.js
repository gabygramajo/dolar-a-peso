const btn_convert = document.getElementById('btn-convert');
let prices = document.getElementById('price-dolar');
let quality = document.getElementById('quantity');
let table = document.getElementById('table');

const validateValues = () => {
    if(prices.value.length === 0 || quality.value === 0) // valida que el input del precio no esté vacio y la cantidad no sea 0
        return false;
    if(isNaN(prices.value)  || isNaN(quality.value)) // valida que sean numeros
        return false;
    if(parseFloat(prices.value) <= 0 || parseFloat(quality.value) <= 0) // valida que los valores sean > 0.
        return false;
    return true; // si esta todo correcto.
}
 
const updateTable = () => {
    const dolar = 95.47; // 24/6/2021
    const retencion = .35;
    const impuestoPais = .3;
    let cantidad = (quality.value.trim() === "") ? 1 : quality.value; // si la cantidad esta vacia retorna 1 
    let price = prices.value * cantidad;
    let impuestos = (price * retencion) + (price * impuestoPais); 
    let total = price + impuestos;
    let cast = total * dolar;

    let html = 
    `<p>
        Entrada: $${price}<br>
        Retención: $${(price * retencion).toFixed(2)}<br>
        Impuesto País: $${(price * impuestoPais).toFixed(2)}<br>
        Dolar: $${dolar}<br>
        Peso ARG: $${cast.toFixed(2)}
    </p>`;
    table.innerHTML = html; // introduce las operaciones en el html.
    prices.value = "";
    quality.value = "";
}
const getValues = () => { // se activa al darle click a btn de convertir.
    if (validateValues() ){ // valida los campos
        updateTable(); // si esta todo ok, ejecuta la conversión.
    } else {
        alert('Por favor, complete correctamente.'); 
    }
}

btn_convert.addEventListener('click', getValues);
