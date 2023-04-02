import patients from "../data/patients";
import { v1 as uuid } from "uuid";

import { Patient, NonSensitivePatient, Gender, NewPatient } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPatient = (patient: any): patient is NewPatient => {
  return (
    isString(patient.name) &&
    isString(patient.dateOfBirth) &&
    isString(patient.ssn) &&
    isString(patient.gender) &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isGender(patient.gender) &&
    isString(patient.occupation)
  );
};

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

export const getPatients = (): Patient[] => {
  return patients;
};

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};
