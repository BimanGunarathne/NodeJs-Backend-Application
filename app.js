const express = require("express");
const axios = require("axios");
const { User, WeatherSchema } = require("./Database/database");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/weather/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    const location = user.location;
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={3311f30a0ec95ad92d38eaedfd5eb755}`
    );

    const { main } = weatherResponse.data;
    const temperature = main.temp;

    const newWeatherData = new WeatherSchema({
      userId: user._id,
      temperature,
    });
    await newWeatherData.save();

    res.status(200).json({ temperature });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
