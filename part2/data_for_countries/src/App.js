/*
  Countries Data App

  Requirements:
  - input where user can filter countries based on country name
      * if returned countries > 10, tell user to make query more specific;
      * if returned countries <= 10 && > 1, all country names are shown in a list;
      * if returned countries === 1, basic data for country is shown (capital, area, languages spoken and flag)
  
  Implementation:
  - Create input field.
  - On initial render fetch data for all countries and store it (in state).
  - Create a state for displayedCountries and set initially to null.
  - Create a filterCriteria state and set to value of input.

  - When user inputs a value in the field:
    1. filterCriteria is updated to the value of the field.
    2. filter allCountries and check number of returned countries:  ----- separate to component
      * if returnedCountries > 10 return message;
      * if returned countries <= 10 && > 1 return list of countries;
      * if returned countries === 1 return country data.
*/
import {useState, useEffect} from "react";
import axios from "axios";

import Countries from "./Countries";

function App() {
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(response => {
      setAllCountries(response.data);
    })
  }, []);

  const [allCountries, setAllCountries] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");
  const [displayedCountries, setDisplayedCountries] = useState(null);

  function countryFilterHandler(event) {
    const filter = event.target.value;
    const filteredCountries = allCountries.filter(country => {
      return country.name.common.toLowerCase().includes(filter); 
    })

    setDisplayedCountries(filteredCountries);
  }

  return (
    <div className="App">
      <p>Find countries: <input onChange={countryFilterHandler}/></p>
      <Countries countries={displayedCountries}/>
    </div>
  );
}

export default App;
