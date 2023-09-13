const axios = require("axios");

const OPENWEATHERMAP_API_KEY = "ae883d9bff482ad14d1e276e9bc01b3c";

async function getWeather(location) {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=Colombo&limit=5&appid=ae883d9bff482ad14d1e276e9bc01b3c`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
