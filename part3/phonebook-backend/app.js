const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const connect = require("./connection");
connect();
const Person = require("./person");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body"
  )
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>`
    );
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  Person.findById(id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  // TODO: consider using this to check for duplicate names
  // if (persons.find((person) => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
