import { useEffect } from "react"
import { useState } from "react"

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
console.log('WEATHER_API_KEY', WEATHER_API_KEY)

function CountryDetails({ country }) {
  const [weather, setWeather] = useState(null);
  const { latlng, name, capital, area, languages, flags } = country;

  useEffect(() => {
    const [lat, lon] = latlng;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        console.log('weather data', data)
        setWeather(data)
      })
  }, [latlng]);

  return (
    <>
      <h1>{name.common}</h1>
      <p>capital {capital[0]}</p>
      <p>area {area} km²</p>
      <h2>languages</h2>
      <ul>
        {Object.values(languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={flags.png} alt={`${name.common} flag`} width="100" />
      {weather && (
        <>
          <h2>Weather in {name.common}</h2>
          <p><strong>temperature:</strong> {weather.main.temp} Celsius</p>
          <div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>{weather.weather[0].description}</p>
          </div>
          <p><strong>wind:</strong> {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => response.json())
      .then(setCountries);
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSelectedCountry(null);
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div>
        find countries <input value={searchTerm} onChange={handleSearchChange} />
      </div>
      <div id="results">
        {filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p> :
          filteredCountries.length === 0 ? <p>No matches found</p> :
            filteredCountries.length === 1 ? <CountryDetails country={filteredCountries[0]} /> :
              filteredCountries.map((country) => (
                <div key={country.name.common}>
                  <p>{country.name.common} <button onClick={() => setSelectedCountry(country)}>show</button></p>
                  {selectedCountry && selectedCountry.name.common === country.name.common && <CountryDetails country={country} />}
                </div>
              ))
        }
      </div>
    </>
  );
}


export { App }
