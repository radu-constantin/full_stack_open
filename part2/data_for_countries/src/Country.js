export default function Country({ countryData }) {
  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <h3>Capital: {countryData.capital}</h3>
      <h3>Area: {countryData.area}</h3>
      <h3>Languages</h3>
      <ul>
        {countryData.languages.map(language => {
          return <li>{language}</li>
        })}
      </ul>
    </div>
  )
}