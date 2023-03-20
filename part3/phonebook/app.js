const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const sample_data = require("./utils/sample_data");
const middlewares = require("./utils/middlewares");
const mongo_connection = require("./mongo_connection");

const personsController = require("./controllers/personsController");

morgan.token("body", (req, _) => JSON.stringify(req.body));

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("build"));

app.use("/api/persons", personsController);

app.get("/info", (req, res) => {
  let toSend = `<p>Phonebook has info for ${sample_data.length} people</p>`;
  toSend += `<p>${new Date()}</p>`;
  res.send(toSend);
});

app.use(middlewares.unknownEndpoint);

module.exports = app;
