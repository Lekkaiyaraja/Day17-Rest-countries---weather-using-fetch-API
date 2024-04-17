document.addEventListener("DOMContentLoaded", function() {
    const countryCardsContainer = document.getElementById("countryCards");
  
    // Fetch data from Rest Countries API
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(countries => {
        countries.forEach(country => {
          const card = createCountryCard(country);
          countryCardsContainer.appendChild(card);
          // Fetch weather data for each country
          fetchWeatherData(country, card);
        });
      })
      .catch(error => console.log("Error fetching countries data:", error));
  
    // Function to create a Bootstrap card for each country
    function createCountryCard(country) {
      const card = document.createElement("div");
      card.classList.add("col-lg-4", "col-md-6", "mb-4");
      card.innerHTML = `
        <div class="card">
          <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common} flag">
          <div class="card-body">
            <h5 class="card-title">${country.name.common}</h5>
            <p class="card-text">Capital: ${country.capital}</p>
            <p class="card-text">Region: ${country.region}</p>
            <p class="card-text">Country Codes: ${Object.values(country.cca2).join(', ')}</p>
            <button class="btn btn-primary" onclick="getWeather('${country.capital}')">Click for Weather</button>
            <p class="card-text" id="weatherInfo-${country.name.common}">Weather: Loading...</p>
          </div>
        </div>
      `;
      return card;
    }
  
    // Function to fetch weather data from OpenWeatherMap API
    function fetchWeatherData(country, card) {
      const lat = country.latlng[0];
      const lng = country.latlng[1];
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=8f964f222327fda666f760bee692f066&units=metric`)
        .then(response => response.json())
        .then(weatherData => {
          const weatherInfo = document.getElementById(`weatherInfo-${country.name.common}`);
          weatherInfo.textContent = `Weather: ${weatherData.weather[0].description}, Temperature: ${weatherData.main.temp}°C`;
        })
        .catch(error => console.log(`Error fetching weather data for ${country.name.common}:`, error));
    }
  });
  