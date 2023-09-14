const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const { getWeather } = require("./utils/weather");
const { sendWeatherReport } = require("./utils/mailer");
const User = require("./models/user");
const { log } = require("console");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/weatherapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/user", async (req, res) => {
  try {
    const { email, location } = req.body;
    const user = new User({ email, location });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { location } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { location },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.get("/users/:id/weather/:date", async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.params.data;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const weatherData = await getWeatherByDateAndLocation(Date, user.location);

    if (!weatherData) {
      return res.status(404).json({
        error: "Weather data not found for the specified date and location",
      });
    }
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

cron.schedule("0 * * * *", async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const weatherData = await getWeather(user.location);
      sendWeatherReport(user.email, weatherData);
    }
  } catch (error) {
    console.error("Error sending hourly weather reports:", error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

var server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
