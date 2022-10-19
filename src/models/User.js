const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: {
    type: Strig,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", Schema);
