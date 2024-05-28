function validateInput() {
    const temperature = document.getElementById('temperature').value;
    if (isNaN(temperature) || temperature === '') {
        document.getElementById('result').textContent = 'Please enter a valid number';
    } else {
        document.getElementById('result').textContent = '';
    }
}

function convertTemperature() {
    const temperature = parseFloat(document.getElementById('temperature').value);
    const unit = document.getElementById('unit').value;
    let result;

    if (isNaN(temperature)) {
        alert('Please enter a valid number');
        return;
    }

    if (unit === 'fahrenheit') {
        const celsius = (temperature - 32) * 5/9;
        const kelvin = celsius + 273.15;
        result = `${celsius.toFixed(2)} °C / ${kelvin.toFixed(2)} K`;
    } else if (unit === 'celsius') {
        const fahrenheit = (temperature * 9/5) + 32;
        const kelvin = temperature + 273.15;
        result = `${fahrenheit.toFixed(2)} °F / ${kelvin.toFixed(2)} K`;
    } else if (unit === 'kelvin') {
        const celsius = temperature - 273.15;
        const fahrenheit = (celsius * 9/5) + 32;
        result = `${celsius.toFixed(2)} °C / ${fahrenheit.toFixed(2)} °F`;
    }

    document.getElementById('result').textContent = result;
}
