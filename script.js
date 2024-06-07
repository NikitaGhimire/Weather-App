const apiKey = '213e24513ce543a3956225138242005';
const baseUrl = 'https://api.weatherapi.com/v1/current.json';

async function fetchWeather(location) {
    const response = await fetch(`${baseUrl}?key=${apiKey}&q=${location}`);
    const data = await response.json();
    return data;
}

document.getElementById('location-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('location-input').value;
    document.getElementById('loading').style.display = 'block';
    const weatherData = await fetchWeather(location);
    document.getElementById('loading').style.display = 'none';
    console.log(weatherData); // Temporary for debugging
    displayWeather(weatherData);
});

function processWeatherData(data) {
    return {
        location: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon
    };
}

function displayWeather(data) {
    const processedData = processWeatherData(data);
    const weatherInfo = document.getElementById('weather-info');
    
    weatherInfo.innerHTML = `
        <h2>${processedData.location}, ${processedData.country}</h2>
        <img src="${processedData.icon}" alt="${processedData.condition}">
        <p>${processedData.temperature}°C</p>
        <p>${processedData.condition}</p>
    `;
}
