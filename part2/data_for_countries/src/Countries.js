import Country from "./Country";

export default function Countries({ countries }) {
  function setContent() {
    if (!countries) {
      return null;
    } else if (countries.length > 10) {
      return (
        <p>Too many matches, be more specific!</p>
      )
    } else if (countries.length > 1 && countries.length <= 10) {
      return (
        <ul>
          {countries.map(country => <li key={country.name.common}>{country.name.common}</li>)}
        </ul>
      )
    } else {
      return (
        <Country countryData={countries[0]}/>
      )
    }
  }

  const content = setContent();

  return (
    content
  )
}