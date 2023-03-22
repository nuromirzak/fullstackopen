import CountryCard from "./CountryCard";
import { useState } from "react";

const CountryList = (props) => {
  const { countries } = props;
  const [show, setShow] = useState({});

  const handleShow = (country) => {
    const newShow = {
      ...show,
      [country.name.common]: !show[country.name.common],
    };
    setShow(newShow);
    console.log(newShow);
  };

  if (countries === null) {
    return null;
  }

  if (countries.length >= 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => {
          return (
            <div key={country.name.common}>
              <div>
                {country.name.common}
                <button onClick={() => handleShow(country)}>
                  {show[country.name.common] ? "hide" : "show"}
                </button>
              </div>
              <CountryCard
                country={show[country.name.common] === true ? country : null}
              />
            </div>
          );
        })}
      </div>
    );
  } else if (countries.length === 1) {
    const country = countries[0];

    return (
      <div>
        <CountryCard country={country} />
      </div>
    );
  }
};

export default CountryList;
