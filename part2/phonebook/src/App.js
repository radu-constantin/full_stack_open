import { useState } from 'react';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

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