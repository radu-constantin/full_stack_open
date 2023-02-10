import { useState } from 'react'

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
      <p>Filter: <input onChange={handleNameFilter} value={nameFilter}/></p>
      <h2>Add</h2>
      <form onSubmit={addPerson}>
        <div>
          <p>name: <input onChange={handleNameChange} value={newName}/></p>
          <p>number: <input onChange={handleNumberChange} value={newNumber}/></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {displayedPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App