import axios from 'axios';
import { useState, useEffect } from 'react';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    })
  }, [])

  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const displayedPersons = nameFilter === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase())) 
 
  function handleNameFilter(event) {
    setNameFilter(event.target.value);
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function addPerson(event) {
    event.preventDefault();

    if (isDuplicate(newName)) {
      setNewName("");
      return alertUser(`${newName} is already in the phonebook!`);
    }

    const personObj = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObj));
    setNewName("");
    setNewNumber("");
  }

  function isDuplicate(name) {
    return !!persons.find(person => person.name.toLowerCase() === name.toLowerCase());
  }

  function alertUser(message) {
    window.alert(message);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputHandler={handleNameFilter} inputValue={nameFilter}/>
      <h2>Add new entry</h2>
      <PersonForm submitHandler={addPerson} nameHandler={handleNameChange} numberHandler={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons personList={displayedPersons}/>
    </div>
  )
}

export default App