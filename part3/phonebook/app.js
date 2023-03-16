const express = require("express");
const app = express();
const sample_data = require("./utils/sample_data");

const personsController = require("./controllers/personsController");

app.use(express.json());

app.use("/api/persons", personsController);

app.get("/info", (req, res) => {
  let toSend = `<p>Phonebook has info for ${sample_data.length} people</p>`;
  toSend += `<p>${new Date()}</p>`;
  res.send(toSend);
});

module.exports = app;
