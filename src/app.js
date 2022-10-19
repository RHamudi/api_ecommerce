const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const app = express();
const routes = require("./routes/index");

// middleware
app.use(cors());
app.use(express.json());
app.use(routes);

// Routes

// start server and connecting to database
app.listen(8081, () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Server is running and connected to database");
  });
});
