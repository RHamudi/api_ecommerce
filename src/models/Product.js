const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  productAccess: {
    type: Number,
    required: true
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  imageHash: {
    type: String,
    required: true
  },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", Schema);
