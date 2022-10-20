const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const app = express();
const routes = require("./routes/index");

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(routes);

const port = process.env.PORT || 3000;
// start server and connecting to database
app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://ramonramos:ramonramos@ecommerce.vu3jlet.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Server is running and connected to database");
    });
});
