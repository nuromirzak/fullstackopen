import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NonSensitivePatient, Patient, Gender, isGender, isNewPatient } from '../types';

const patients: Array<Patient> = patientsData.filter(patient =>
    isGender(patient.gender))
    .map(patient => ({
        ...patient,
        gender: patient.gender === 'male' ? Gender.Male : Gender.Female,
    }));

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map((patient) => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    }));
};

const addPatient = (entry: unknown): Patient => {
    if (!isNewPatient(entry)) {
        throw new Error('Invalid entry: Entry does not conform to NewPatient type');
    }

    const id: string = uuid();
    const newPatientEntry: Patient = {
        ...entry,
        id
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};


export default {
    getNonSensitiveEntries,
    addPatient,
};

