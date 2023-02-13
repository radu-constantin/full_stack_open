import { useState, useEffect } from 'react';

import { getAll, create, remove, updateNumber } from './services/phonebook';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  useEffect(() => {
    getAll().then(response => {
      setPersons(response);
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

    const personObj = {
      name: newName,
      number: newNumber
    }

    if (isDuplicate(newName)) {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to replace the old number with a new one?`)) {
        const targetPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
        const updatedPerson = {...targetPerson, number: newNumber};
        updateNumber(updatedPerson);
        setPersons(persons.map(person => {
          return person.id === updatedPerson.id ? updatedPerson : person;
        }))
      };
    } else {
      create(personObj).then(response => {
        setPersons(persons.concat(response));
      })
    }

    setNewName("");
    setNewNumber("");
  }

  function isDuplicate(name) {
    return !!persons.find(person => person.name.toLowerCase() === name.toLowerCase());
  }

  function alertUser(message) {
    window.alert(message);
  }

  function removePersonHandler(personObj) {
    return () => {
      if (window.confirm(`Are you sure you want to delete ${personObj.name}?`)) {
        remove(personObj.id).then(() => {
          setPersons(persons.filter(person => {
            return person.id !== personObj.id;
          }))
        })
      };
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputHandler={handleNameFilter} inputValue={nameFilter} />
      <h2>Add new entry</h2>
      <PersonForm submitHandler={addPerson} nameHandler={handleNameChange} numberHandler={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons personList={displayedPersons} deletePerson={removePersonHandler} />
    </div>
  )
}

export default App