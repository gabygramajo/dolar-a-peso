const btn_convert = document.getElementById('btn-convert');
const inputPrice = document.getElementById('price-in-dolar');
const inputQuality = document.getElementById('quantity');
const dolarCurrently = document.getElementById('dolar');
const table = document.getElementById('list-contain');

const validateValues = () => {
    if(inputPrice.value.length === 0 || inputQuality.value === 0) // valida que el input del precio no esté vacio y la cantidad no sea 0
        return false;
    if(isNaN(inputPrice.value)  || isNaN(inputQuality.value)) // valida que sean numeros
        return false;
    if(parseFloat(inputPrice.value) <= 0 || parseFloat(inputQuality.value) <= 0) // valida que los valores sean > 0.
        return false;
    return true; // si esta todo correcto.
}
// ------- calculadores -------
const inputValue = (price, quality) => {
    return  (price * quality).toFixed(2);
}

const calcularRentencion = (totalEntry,rentencion) => {
    return parseFloat((totalEntry * rentencion).toFixed(2));
}

const calcularImpuestoPais = (totalEntry,impuestoPais) => {
    return parseFloat((totalEntry * impuestoPais).toFixed(2));
}

const totalPriceInUsd = (totalEntry, totalTax) => {
    return (totalEntry + totalTax).toFixed(2);
}
const convertCurrency = (priceInUsd, dolar) => {
    return (priceInUsd * dolar).toFixed(2);
}

const updateTable = () => {
    const dolar = (dolarCurrently.value === "" ) ? 97.17 : parseFloat(dolarCurrently.value); // 8/7/2021
    const retencion = .35;
    const impuestoPais = .3;
    const quality = (inputQuality.value.trim() === "") ? 1 : Number(inputQuality.value); // si la cantidad esta vacia retorna 1 
    const totalEntry = parseFloat(inputPrice.value) * quality;
    console.log(totalEntry);

    const totalTax =  calcularRentencion(totalEntry, retencion)
                    + 
                    calcularImpuestoPais(totalEntry,impuestoPais); 

    const html = 
    ` <ul>
        <li>
            <span class="head-list">Dolar:</span> $${dolar} ars.
        </li>
        <li>
            <span class="head-list">Entrada:</span>
            $${inputValue(inputPrice.value, quality)} usd = 
            $${convertCurrency(inputValue(inputPrice.value, quality),dolar)} ars.
        </li>
        <li>
            <span class="head-list">Retención:</span> +
            $${calcularRentencion(totalEntry, retencion)} usd = 
            $${convertCurrency(calcularRentencion(totalEntry, retencion),dolar)} ars.
        </li>
        <li>
            <span class="head-list">Impuesto País:</span> + 
            $${calcularImpuestoPais(totalEntry,impuestoPais)} usd = 
            $${convertCurrency(calcularImpuestoPais(totalEntry,impuestoPais),dolar)} ars.
        </li>
        <li>
            <span class="head-list">Total USD a ARS:</span> 
            <span class="total-value">
            $${totalPriceInUsd(totalEntry, totalTax)} usd =
            $${convertCurrency(totalPriceInUsd(totalEntry, totalTax), dolar)} ars.
            </span>
        </li>
    </ul>`;

    table.innerHTML = html; // introduce las operaciones en el html.
    inputPrice.value = "";
    inputQuality.value = "";
}
const getValues = () => { // se activa al darle click a btn de convertir.
    if (validateValues() ){ // valida los campos
        updateTable(); // si esta todo ok, ejecuta la conversión.
    } else {
        alert('Por favor, complete correctamente los campos.'); 
    }
}

// ------ Captura de Evento

btn_convert.addEventListener('click', getValues); // click en convertir

document.addEventListener("keypress", (e)=> { // Si precionó Enter
    if(e.code == "Enter")
        getValues();
});