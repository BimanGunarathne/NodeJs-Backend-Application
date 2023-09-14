const axios = require("axios");

const fetchWeatherData = async (location) => {
  const apiKey = "ae883d9bff482ad14d1e276e9bc01b3c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = { fetchWeatherData };
