const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json("Hi");
});

app.get("/results", async (req, res) => {
  const passedLevel = req.query.level;
  console.log(passedLevel);
  
  const options = {
    method: 'GET',
    url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
    params: {
      level: passedLevel,
      area: 'sat'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST 
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));