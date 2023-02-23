require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Person = require('./models/person')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

function isValidInput(person) {
  return person.name && person.name !== "" && person.number && person.number !== "";
}

function checkForDuplicates(name) {
  return persons.find(person => person.name.toLowerCase() === name.toLowerCase());
}

function generateID() {
  return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.send(result);
  })
});

app.get('/api/persons/:id', (request, response) => {
  const personID = Number(request.params.id);
  const person = persons.find(person => person.id === personID);
  if (person) {
    response.send(person);
  } else {
    response.status(404).end();
  }
});

app.post('/api/persons', (request, response) => {
  if (!isValidInput(request.body)) {
    response.status(406).send({ error: "No name or number entered!" })
  } else {
    const newPerson = new Person(request.body);
    newPerson.save().then(result => {
      response.send(result);
    });
  }
    // else if (checkForDuplicates(newPerson.name)) {
    // response.status(406).send({ error: `${newPerson.name} is already in the phonebook!` })
});

app.delete('/api/persons/:id', (request, response) => {
  const personID = Number(request.params.id);
  persons = persons.filter(person => person.id !== personID);
  response.status(204).end();
});

app.get('/info', (request, response) => {
  let content = `<p>Phonebook has info for ${persons.length} people.<p>
  <p>${new Date()}<p>`
  response.send(content);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})