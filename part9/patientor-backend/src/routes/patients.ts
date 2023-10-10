import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    return res.json(patient);
  } else {
    return res.status(404).send("Patient not found");
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = patientService.addPatient(req.body);
    return res.json(newPatientEntry);
  } catch (e) {
    let error = "Error: ";
    if (e instanceof Error) {
      error += e.message;
    }
    return res.send(error).status(400);
  }
});

export default router;