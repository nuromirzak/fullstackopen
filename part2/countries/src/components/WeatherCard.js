import { useState, useEffect } from "react";
import weather_service from "../service/weather_service";

const WeatherCard = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const kelvinToCelcius = (kelvin) => {
    return kelvin - 273.15;
  };

  useEffect(() => {
    weather_service.getWeatherForCountry(country).then((weather) => {
      setWeather(weather);
    });
  }, [country]);

  if (weather) {
    return (
      <>
        <h2>Weather in {weather.name}</h2>
        <div>
          <b>temperature:</b> {Math.round(kelvinToCelcius(weather.main.temp) * 100) / 100} Celcius
        </div>
        <img
          src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt="weather icon"
        />
        <div>
          <b>wind:</b> {weather.wind.speed} meter/sec, direction{" "}
          {weather.wind.deg}
        </div>
      </>
    );
  } else {
    return <p>Loading weather...</p>;
  }
};

export default WeatherCard;
