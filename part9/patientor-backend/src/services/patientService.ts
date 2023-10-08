import patientsData from '../../data/patients';

import { NonSensitivePatient, Patient } from '../types';

const patients: Array<Patient> = patientsData;

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map((patient) => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    }));
};

export default {
    getNonSensitiveEntries,
};

