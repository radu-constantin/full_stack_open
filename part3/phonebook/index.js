const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
// app.use(morgan('tiny'));
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

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

app.post('/api/persons', (request, response) => {
  let newPerson = request.body;
  if (!isValidInput(newPerson)) {
    response.status(406).send({ error: "No name or number entered!" })
  } else if (checkForDuplicates(newPerson.name)) {
    response.status(406).send({ error: `${newPerson.name} is already in the phonebook!` })
  } else {
    newPerson = { id: generateID(), ...newPerson }
    persons = persons.concat(newPerson);
    response.send(newPerson);
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