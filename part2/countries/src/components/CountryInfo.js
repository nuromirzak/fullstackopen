const CountryInfo = (props) => {
  const { countries } = props;

  if (countries === null) {
    return null;
  }

  if (countries.length >= 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>{country.name.common}</div>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="flag" width="100" />
      </div>
    );
  }
};

export default CountryInfo;
