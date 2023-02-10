import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  function handleChange(event) {
    setNewName(event.target.value);
  }

  function addPerson(event) {
    event.preventDefault();

    if (isDuplicate(newName)) {
      setNewName("");
      return alertUser(`${newName} is already in the phonebook!`);
    }

    const personObj = {
      name: newName
    }

    setPersons(persons.concat(personObj));
    setNewName("");
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
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App