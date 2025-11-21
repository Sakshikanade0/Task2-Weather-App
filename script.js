const API_KEY = "e4444cb1d3691f61fe3375892fe01529"; // <-- REPLACE THIS

document.getElementById("btn").addEventListener("click", getWeather);
document.getElementById("city").addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Loading...";

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (res.status === 404 || data.cod === "404") {
      resultDiv.innerHTML = "City not found. Please check the name.";
      return;
    }

    // Build UI
    resultDiv.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>🌡 <strong>${Math.round(data.main.temp)}°C</strong> (Feels like ${Math.round(data.main.feels_like)}°C)</p>
      <p>☁ ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "Error fetching weather. Check your internet connection.";
  }
}
