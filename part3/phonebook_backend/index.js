require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Person = require('./models/person')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

function customErrorHandler(error, request, response) {
  if (error.name === "CastError") {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === "ValidationError") {
    response.status(400).send({error: error.message});
  }
}

// function isValidInput(person) {
//   return person.name && person.name !== "" && person.number && person.number !== "";
// }

// function checkForDuplicates(name) {
//   return persons.find(person => person.name.toLowerCase() === name.toLowerCase());
// }

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.send(result);
  })
});

app.get('/api/persons/:id', (request, response, next) => {
  const personID = request.params.id;
  Person.findById(personID).then(result => {
    if (result) {
      response.send(result);
    } else {
      response.status(404).end();
    }
  })
  .catch(error => {
    next(error);
  })
});

app.post('/api/persons', (request, response, next) => {
    const newPerson = new Person(request.body);
    newPerson.save().then(result => {
      response.send(result);
    })
    .catch(error => {
      next(error)
    })
  });
  // else if (checkForDuplicates(newPerson.name)) {
  // response.status(406).send({ error: `${newPerson.name} is already in the phonebook!` })

app.put('/api/persons/:id', (request, response, next) => {
  const updatedPerson = request.body;
    Person.findByIdAndUpdate(request.params.id, { ...updatedPerson }, { returnDocument: "after", runValidators: true, context: "query" }).then(result => {
      response.send(result);
    })
      .catch(error => {
        next(error);
      });
})

app.delete('/api/persons/:id', (request, response, next) => {
  const personID = request.params.id;

  Person.findByIdAndDelete(personID).then(() => {
    response.status(204).end();
  })
    .catch(error => {
      next(error);
    })
});

app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    let content = `<p>Phonebook has info for ${result.length} people.<p>
    <p>${new Date()}<p>`

    response.send(content);
  })
});

app.use(customErrorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})