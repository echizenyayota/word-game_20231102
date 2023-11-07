const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.json("Hi");
});

app.get("/results", (req, res) => {
  res.json("results");
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));