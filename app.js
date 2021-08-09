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

const inputValue = () => {
    const quality = (inputQuality.value.trim() === "") ? 1 : parseInt(inputQuality.value); // si la cantidad esta vacia retorna 1 

    return  parseFloat((parseFloat(inputPrice.value) * quality).toFixed(2));
}

const calcularRentencion = () => {
    return parseFloat((inputValue() * .35).toFixed(2));
}

const calcularImpuestoPais = () => {
    return parseFloat((inputValue() * .3).toFixed(2));
}

const totalPriceInUsd = () => {
    const totalTax =  calcularRentencion(inputValue())
                    + 
                    calcularImpuestoPais(inputValue()); 
    return (inputValue() + totalTax).toFixed(2);
}

const convertCurrency = (priceInUsd) => {
    return (priceInUsd * dollarValue()).toFixed(2);
}

const dollarValue = () => {
    return (dolarCurrently.value === "" ) ? 97.17 : parseFloat(dolarCurrently.value);
}

const updateTable = () => {

    const html = 
    ` <ul>
        <li>
            <span class="head-list">Dolar:</span> $${dollarValue()} ars.
        </li>
        <li>
            <span class="head-list">Entrada:</span>
            $${inputValue()} usd = 
            $${convertCurrency(inputValue())} ars.
        </li>
        <li>
            <span class="head-list">Retención:</span> +
            $${calcularRentencion()} usd = 
            $${convertCurrency(calcularRentencion())} ars.
        </li>
        <li>
            <span class="head-list">Impuesto País:</span> + 
            $${calcularImpuestoPais()} usd = 
            $${convertCurrency(calcularImpuestoPais())} ars.
        </li>
        <li>
            <span class="head-list">Total USD a ARS:</span> 
            <span class="total-value">
            $${totalPriceInUsd()} usd =
            $${convertCurrency(totalPriceInUsd())} ars.
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