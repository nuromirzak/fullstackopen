import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;
console.log(`Got API key: ${API_KEY}`);

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const getWeatherForCountry = (country) => {
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  return axios
    .get(BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
    });
};

const weatherService = {
  getWeatherForCountry,
};

export default weatherService;
