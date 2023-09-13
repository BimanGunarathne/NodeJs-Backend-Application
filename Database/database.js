const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requird: true,
    unique: true,
  },
  loacation: {
    type: String,
    requird: true,
  },
});

const weatherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  temperature: Number,
});

const User = mongoose.model("User", userSchema);
const WeatherSchema = mongoose.model("WeatherData", weatherSchema);

module.exports = {
  User,
  WeatherSchema,
};
