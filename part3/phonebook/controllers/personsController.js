const personsController = require("express").Router();
let sample_data = require("../utils/sample_data");

personsController.get("/", (req, res) => {
  res.json(sample_data);
});

personsController.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = sample_data.find((person) => person.id === id);

  if (!person) {
    return res.status(404).send({ error: `Person with id ${id} not found` });
  }

  res.json(person);
});

personsController.post("/", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).send({ error: "Name or number missing" });
  }

  const person = sample_data.some((person) => person.name === name);

  if (person) {
    return res.status(400).send({ error: "Name must be unique" });
  }

  sample_data.push({ id: Math.floor(Math.random() * 1000), name, number });

  res.status(201).send(sample_data[sample_data.length - 1]);
});

personsController.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).send({ error: "Name or number missing" });
  }

  const person = sample_data.find((person) => person.id === id);

  if (!person) {
    return res.status(404).send({ error: `Person with id ${id} not found` });
  }

  person.name = name;
  person.number = number;

  res.status(200).send(person);
});

personsController.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  sample_data = sample_data.filter((person) => person.id !== id);

  res.status(204).send("Person deleted");
});

module.exports = personsController;
