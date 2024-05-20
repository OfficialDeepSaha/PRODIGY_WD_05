const apiKey = "46219568431107d6e5b3d8d5800029ff"; // Replace with your actual weather API key


const locationInput = document.getElementById("location");
const searchBtn = document.getElementById("search-btn");
const city = document.getElementById("city");
const weather = document.getElementById("weather");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feels_like");
const humidity = document.getElementById("humidity");

function getWeatherByLocation(loc) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        city.textContent = `Location: ${data.name}`;
        weather.textContent = `Weather: ${data.weather[0].main}`;
        temp.textContent = `Temperature: ${data.main.temp}°C`;
        feelsLike.textContent = `Feels Like: ${data.main.feels_like}°C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
      } else {
        alert("Error! Please enter a valid city name.");
      }
    })
    .catch(error => console.error(error));
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
          city.textContent = `Location: ${data.name}`;
          weather.textContent = `Weather: ${data.weather[0].main}`;
          temp.textContent = `Temperature: ${data.main.temp}°C`;
          feelsLike.textContent = `Feels Like: ${data.main.feels_like}°C`;
          humidity.textContent = `Humidity: ${data.main.humidity}%`;
        })
        .catch(error => console.error(error));
    }, (error) => {
      alert("Geolocation access denied.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) {
    getWeatherByLocation(location);
  } else {
    alert("Please enter a city name.");
  }
});

// Get user location on page load (optional)
// uncomment the following line to enable location on page load
// getUserLocation();
