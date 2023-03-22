const personsController = require("express").Router();
const sample_data = require("../utils/sample_data");
const Person = require("../models/person");

personsController.get("/", async (req, res) => {
  const persons = await Person.find({});

  res.json(persons);
});

personsController.get("/init", async (req, res) => {
  await Person.deleteMany({});
  const persons = sample_data.map(({ id, ...rest }) => rest);
  console.log(persons);
  const toReturn = await Person.insertMany(persons);

  res.send(toReturn);
});

personsController.get("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findById(id);

  if (!person) {
    return res.status(404).send({ error: `Person with id ${id} not found` });
  }

  res.json(person);
});

personsController.post("/", async (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).send({ error: "Name or number missing" });
  }

  const person = await Person.findOne({ name });

  if (person) {
    return res.status(400).send({ error: "Name must be unique" });
  }

  const newPerson = new Person({ name, number });
  await newPerson.save();

  res.status(201).send(newPerson);
});

personsController.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).send({ error: "Name or number missing" });
  }

  const updatedPerson = { name, number };
  const person = await Person.findByIdAndUpdate(id, updatedPerson, {
    new: true,
    runValidators: true,
    context: "query",
  });

  res.status(200).send(person);
});

personsController.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const deletedPerson = await Person.findByIdAndDelete(id);

  res.status(204).send(deletedPerson);
});

module.exports = personsController;
