const axios = require("axios");

const API_KEY = "ae883d9bff482ad14d1e276e9bc01b3c";

async function fetchWeather(location) {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API_KEY}`
  );
  return response.data;
}

module.exports = { fetchWeather };
