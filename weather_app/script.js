async function fetchWeather() {
    const city = document.getElementById("search").value;
    /*console.log(city);*/

    const apiKey = "1a068014e839af3c2e5d0db90dbb1a25";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].description;

    /*console.log(temperature);
    console.log(humidity);
    console.log(condition);*/

    const weatherData = document.getElementById("weather-data");
    weatherData.style.display = "block";

    weatherData.innerHTML = `
    <h2 id="city">${city}</h2>
    <p id="temperature">${temperature}°C</p>
    <p id="condition">${condition}</p>
    <p id="humidity">Humidity: ${humidity}%</p>
    `;
}
