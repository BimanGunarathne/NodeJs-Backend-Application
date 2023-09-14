const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  weatherData: [
    {
      date: Date,
      temperature: Number,
      humidity: Number,
    },
  ],
});
module.exports = mongoose.model('User', userSchema);