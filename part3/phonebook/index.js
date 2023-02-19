const express = require('express');
const app = express();

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (request, response) => {
  response.send(persons);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})