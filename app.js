const express = require("express");
const axios = require("axios");
const { User, WeatherSchema } = require("./Database/database");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
