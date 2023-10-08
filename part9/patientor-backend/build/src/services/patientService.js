"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const types_1 = require("../types");
const patients = patients_1.default.filter(patient => isGender(patient.gender))
    .map(patient => (Object.assign(Object.assign({}, patient), { gender: patient.gender === 'male' ? types_1.Gender.Male : types_1.Gender.Female })));
const getNonSensitiveEntries = () => {
    return patients.map((patient) => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    }));
};
const addPatient = (entry) => {
    if (!isNewPatient(entry)) {
        throw new Error('Invalid entry: Entry does not conform to NewPatient type');
    }
    const id = (0, uuid_1.v1)();
    const newPatientEntry = Object.assign(Object.assign({}, entry), { id });
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const isNewPatient = (entry) => {
    return (typeof entry === 'object' &&
        entry !== null &&
        'name' in entry && isString(entry.name) &&
        'dateOfBirth' in entry && isString(entry.dateOfBirth) &&
        'ssn' in entry && isString(entry.ssn) &&
        'gender' in entry && isString(entry.gender) && isGender(entry.gender) &&
        'occupation' in entry && isString(entry.occupation));
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(gender);
};
exports.default = {
    getNonSensitiveEntries,
    addPatient,
};
