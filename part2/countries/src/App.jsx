import { useEffect } from "react"
import { useState } from "react"

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data)
        return setCountries(data)
      })
  }, [])

  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
  console.log('filteredCountries', filteredCountries)

  function renderCountryDetails(country) {
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area} km²</p>

        <h2>languages</h2>

        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>

        <img src={country.flags.png} alt={country.flags.alt} width="100" />
      </>
    )
  }

  return (
    <>
      <div>
        find countries <input value={searchTerm} onChange={(e) => {
          setSelectedCountry(null)
          setSearchTerm(e.target.value)
        }} />
      </div>
      <div id="results">
        {
          filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : filteredCountries.length > 1 ? (
            filteredCountries.map((country) => {
              return (
                <div key={country.name.common}>
                  <p>
                    {country.name.common}

                    <button onClick={() => setSelectedCountry(country)}>show</button>
                  </p>

                  {selectedCountry && selectedCountry.name.common === country.name.common ? renderCountryDetails(selectedCountry) : null}
                </div>
              )
            })
          ) : filteredCountries.length === 0 ? (
            <p>No matches found</p>
          ) : (
            renderCountryDetails(filteredCountries[0])
          )
        }
      </div>
    </>
  )
}

export { App }
