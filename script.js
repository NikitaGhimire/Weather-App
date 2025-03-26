const apiKey = '213e24513ce543a3956225138242005';
const baseUrl = 'https://api.weatherapi.com/v1/current.json';

async function fetchWeather(location) {
    const response = await fetch(`${baseUrl}?key=${apiKey}&q=${location}`);
    const data = await response.json();
    return data;
}

document.getElementById('location-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'none'; // Hide weather info before new search
    document.getElementById('loading').style.display = 'block';
    const location = document.getElementById('location-input').value;
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

function getWeatherBackground(condition) {
    const conditions = {
        'Clear': 'linear-gradient(135deg, #00b4db, #0083b0)',
        'Sunny': 'linear-gradient(135deg, #ff8c00, #ff4500)',
        'Partly cloudy': 'linear-gradient(135deg, #757f9a, #d7dde8)',
        'Cloudy': 'linear-gradient(135deg, #606c88, #3f4c6b)',
        'Overcast': 'linear-gradient(135deg, #4b6cb7, #182848)',
        'Rain': 'linear-gradient(135deg, #373b44, #4286f4)',
        'Snow': 'linear-gradient(135deg, #e6dada, #274046)',
        'Thunder': 'linear-gradient(135deg, #283048, #859398)',
        'Mist': 'linear-gradient(135deg, #304352, #d7d2cc)'
    };
    
    return conditions[condition] || 'linear-gradient(135deg, #e3f2fd, #bbdefb)';
}

function displayWeather(data) {
    const processedData = processWeatherData(data);
    const weatherInfo = document.getElementById('weather-info');
    
    // Set weather-based background
    document.body.style.background = getWeatherBackground(processedData.condition);
    
    // Show weather info div
    weatherInfo.style.display = 'block';
    
    weatherInfo.innerHTML = `
        <h2>${processedData.location}, ${processedData.country}</h2>
        <img src="${processedData.icon}" alt="${processedData.condition}">
        <p class="temperature">${processedData.temperature}°C</p>
        <p class="condition">${processedData.condition}</p>
    `;
}
