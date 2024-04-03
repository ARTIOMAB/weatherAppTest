const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/autocomplete", async (req, res) => {
  try {
    const { query } = req.query;
    const apiKey = process.env.API_KEY;
    const autocompleteUrl = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;

    const response = await axios.get(autocompleteUrl);
    const autocompleteData = response.data;

    res.json(autocompleteData);
  } catch (error) {
    console.error("Error fetching autocomplete data:", error.message);
    res.status(500).json({ error: "Unable to fetch autocomplete data" });
  }
});

app.get("/weather", async (req, res) => {
  try {
    const { city } = req.query;
    const apiKey = process.env.API_KEY;
    const apiUrl = ` http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    const { forecast } = response.data;
    const todayHours = forecast.forecastday[0].hour;
    const temperatures = {};
    [13, 14, 15, 16, 17].forEach((hour) => {
      const hourData = todayHours.find((hourData) => {
        const dataHour = new Date(hourData.time_epoch * 1000).getHours();
        return dataHour === hour;
      });
      if (hourData) {
        temperatures[`weatherAt${hour}`] = hourData.temp_c;
      } else {
        temperatures[`weatherAt${hour}`] = null;
      }
    });

    res.json({
      latitude: weatherData.location.lat,
      longitude: weatherData.location.lon,
      city: weatherData.location.name,
      country: weatherData.location.country,
      temp: weatherData.current.temp_c,
      condition: weatherData.current.condition.text,
      precipitation: weatherData.current.precip_mm,
      humidity: weatherData.current.humidity,
      wind: weatherData.current.wind_kph,
      date: weatherData.location.localtime,
      temperatures,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});

app.listen(5000, () => {
  console.log(`Server running on port ${5000}`);
});
