const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { fetchWeatherData } = require('../services/weatherService');
const nodemailer = require('nodemailer');
const cron = require('node-cron');


cron.schedule('0 */3 * * *', async () => {
  const users = await User.find();
  for (const user of users) {
    const weatherData = await fetchWeatherData(user.location);
    sendEmail(user.email, weatherData);
  }
});

const sendEmail = async (email, weatherData) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'testbiman37@gmail.com',
      pass: 'biman2.in',
    },
  });

  const mailOptions = {
    from: 'bimangunarathne@gmail.com',
    to: email,
    subject: 'Hourly Weather Report',
    text: `Weather Data: ${JSON.stringify(weatherData)}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

router.post('/users', async (req, res) => {
  try {
    const { email, location } = req.body;
    const user = new User({ email, location });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/users/:id/location', async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;
    const user = await User.findByIdAndUpdate(id, { location }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users/:id/weather/:date', async (req, res) => {
  try {
    const { id, date } = req.params;
    const user = await User.findById(id);
    const weatherData = user.weatherData.filter((data) => data.date.toISOString().split('T')[0] === date);
    res.json(weatherData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
