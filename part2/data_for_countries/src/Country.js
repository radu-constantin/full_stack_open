import { useState } from "react";

export default function Country({ countryData, details=false }) {
  const name = countryData.name.common;
  const capital = countryData.capital;
  const area = countryData.area;
  const languages = Object.values(countryData.languages);
  const flag = countryData.flag;

  const [showDetails, setShowDetails] = useState(details);

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