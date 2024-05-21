const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const recentLocationsSelect = document.getElementById('recentLocations');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const weatherIconElement = document.querySelector('.weather-icon');

let recentLocations = JSON.parse(localStorage.getItem('recentLocations')) || [];

// Function to update the recent locations dropdown
const updateRecentLocations = () => {
    recentLocationsSelect.innerHTML = '<option value="" disabled selected>Select a location</option>';
    recentLocations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        recentLocationsSelect.appendChild(option);
    });
};

// Function to fetch weather data from the API
const fetchWeatherData = async (location) => {
    const apiKey = '09025e3a08f94270fd63b9deb19f2289';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

// Function to update the weather information on the page
const updateWeather = async (location) => {
    const data = await fetchWeatherData(location);
    if (!data || data.cod !== 200) {
        alert('Location not found');
        return;
    }

    temperatureElement.textContent = data.main.temp;
    descriptionElement.textContent = data.weather[0].description;
    humidityElement.textContent = data.main.humidity;
    windSpeedElement.textContent = data.wind.speed;

    const iconCode = data.weather[0].icon;
    weatherIconElement.style.backgroundImage = `url('https://openweathermap.org/img/wn/${iconCode}@2x.png')`;
};

// Function to handle search button click
searchButton.addEventListener('click', async () => {
    const location = locationInput.value.trim();
    if (!location) return;

    await updateWeather(location);

    if (!recentLocations.includes(location)) {
        recentLocations.push(location);
        if (recentLocations.length > 5) {
            recentLocations.shift();
        }
        localStorage.setItem('recentLocations', JSON.stringify(recentLocations));
        updateRecentLocations();
    }

    locationInput.value = '';
});

// Function to handle recent locations selection
recentLocationsSelect.addEventListener('change', async () => {
    const selectedLocation = recentLocationsSelect.value;
    if (!selectedLocation) return;

    await updateWeather(selectedLocation);
});

// Initialize recent locations dropdown
updateRecentLocations();

// Initialize weather information for the default location (optional)
updateWeather('Berlin');
