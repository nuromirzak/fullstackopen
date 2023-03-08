import { useState, useEffect } from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState(null);
  const [currentCountries, setCurrentCountries] = useState(null);

  const handleCountryNameChange = (event) => {
    const newCountryName = event.target.value;

    setCountryName(newCountryName);

    if (newCountryName) {
      console.log(`Searching for ${newCountryName}...`);
      const newCurrentCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(newCountryName.toLowerCase())
      );
      setCurrentCountries(newCurrentCountries);
      console.log(`Found ${newCurrentCountries.length} countries`);
    } else {
      setCurrentCountries(null);
      console.log("No country name entered");
    }
  };

  useEffect(() => {
    console.log("Initializing countries");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      console.log("Successfullly initialized countries");
    });
  }, []);

  return (
    <div>
      <div>
        find countries
        <input value={countryName} onChange={handleCountryNameChange} />
      </div>

      <CountryInfo countries={currentCountries} />
    </div>
  );
}

export default App;
