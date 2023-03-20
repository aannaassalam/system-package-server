const mongoose = require("mongoose");

const Settings = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("setting", Settings);
