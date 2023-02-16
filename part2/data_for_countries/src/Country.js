import axios from "axios";
import { useState, useEffect } from "react";

export default function Country({ countryData, details = false }) {
  const name = countryData.name.common || null;
  const capital = countryData.capital || null;
  const area = countryData.area || null;
  const languages = Object.values(countryData.languages) || null;
  const flag = countryData.flag || null;

  //Bouvet Island has no capital, that is why I added this conditional.
  const lat = capital ? countryData.capitalInfo.latlng[0] : null;
  const lng = capital ? countryData.capitalInfo.latlng[1] : null;

  const [showDetails, setShowDetails] = useState(details);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (showDetails && capital) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}&units=metric`).then(response => {
        setWeather({ temperature: response.data.main.temp, wind: response.data.wind.speed })
      })
    }
  }, [showDetails, lat, lng, capital]);

  if (showDetails) {
    return (
      <div>
        <h1>{name} {flag}</h1>
        <h3>Capital: {capital}</h3>
        <h3>Area: {area}</h3>
        <h3>Languages:</h3>
        <ul>
          {languages.map(language => {
            return <li key={language}>{language}</li>
          })}
        </ul>
        <div>
          <h2>Weather in {capital}</h2>
          {weather ?
            <>
              <p>Temperature: {weather.temperature} Celsius</p>
              <p>Wind: {weather.wind}</p>
            </>
            : null
          }
        </div>
        <div><button onClick={() => setShowDetails(false)}>hide</button></div>
      </div>
    )
  }

  return (
    <li key={name}>
      {name}
      <button onClick={() => setShowDetails(true)}>show</button>
    </li>
  )
}