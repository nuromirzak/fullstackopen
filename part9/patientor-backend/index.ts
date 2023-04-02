/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import cors from "cors";
const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
import { getDiagnoses } from "./services/diagnoseService";
import {
  getNonSensitivePatients,
  isPatient,
  addPatient,
} from "./services/patientService";

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.send(getDiagnoses());
});

app.get("/api/patients", (_req, res) => {
  res.send(getNonSensitivePatients());
});

app.post("/api/patients", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatientEntry = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  if (isPatient(newPatientEntry)) {
    const addedEntry = addPatient(newPatientEntry);
    res.json(addedEntry);
  } else {
    res.status(400).send("Incorrect or missing data");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
