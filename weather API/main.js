
let cityInput = document.getElementById("city-input");
let searchBtn = document.getElementById("search-btn");
let weatherList = document.getElementById("weather-list");

searchBtn.addEventListener("click", function() {

    let city = cityInput.value;

    if (city === "") {
        weatherList.innerHTML = "Please enter a city name.";
        return;
    }

    fetch("http://localhost:3000/weather")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            let result = data.filter(function(weather) {
                return weather.city.toLowerCase() === city.toLowerCase();
            });

            weatherList.innerHTML = "";

            if (result.length === 0) {
                weatherList.innerHTML = "City not found!";
                return;
            }

            result.forEach(function(weather) {

                let card = document.createElement("div");

                card.innerHTML = `
                    <h2>${weather.city}</h2>
                    <p>ID: ${weather.id}</p>
                    <p>Country: ${weather.country}</p>
                    <p>Latitude: ${weather.latitude}</p>
                    <p>Longitude: ${weather.longitude}</p>
                    <p>Timezone: ${weather.timezone}</p>
                    <p>Temperature: ${weather.temperature} °C</p>
                    <p>Humidity: ${weather.humidity}%</p>
                    <p>Wind Speed: ${weather.windSpeed} km/h</p>
                `;

                weatherList.appendChild(card);
            });

        })
        .catch(function(error) {
            console.log("Error:", error);
            weatherList.innerHTML = "Failed to fetch weather data.";
        });

});