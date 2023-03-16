const express = require("express");
const morgan = require("morgan");
const app = express();
const sample_data = require("./utils/sample_data");

const personsController = require("./controllers/personsController");

morgan.token("body", (req, _) => JSON.stringify(req.body));

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.use("/api/persons", personsController);

app.get("/info", (req, res) => {
  let toSend = `<p>Phonebook has info for ${sample_data.length} people</p>`;
  toSend += `<p>${new Date()}</p>`;
  res.send(toSend);
});

module.exports = app;
