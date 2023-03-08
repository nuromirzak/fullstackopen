const CountryCard = (props) => {
  const { country } = props;

  if (country === null) {
    return null;
  }

  const style = {
    border: "1px solid black",
    margin: "10px",
    padding: "10px",
  };

  return (
    <div style={style}>
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
};

export default CountryCard;
