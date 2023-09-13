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
