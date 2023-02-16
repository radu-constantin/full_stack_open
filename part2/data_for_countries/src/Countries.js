import Country from "./Country";
import { useState } from "react";

export default function Countries({ countries }) {
  function setContent() {
    if (!countries) {
      return null;
    } else if (countries.length === 0) {
      return (
        <p>No countries match your search criteria.</p>
      )
    } else if (countries.length > 10) {
      return (
        <p>Too many matches, be more specific!</p>
      )
    } else if (countries.length > 1 && countries.length <= 10) {
      return (
        <ul>
          {countries.map(country => 
            <Country countryData={country}/>
            )}
        </ul>
      )
    } else {
      return (
        <Country countryData={countries[0]} details={true}/>
      )
    }
  }

  const content = setContent();

  return (
    content
  )
}