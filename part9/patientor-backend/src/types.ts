export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
};

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export const isNewPatient = (entry: unknown): entry is NewPatient => {
    return (
        typeof entry === 'object' &&
        entry !== null &&
        'name' in entry && isString(entry.name) &&
        'dateOfBirth' in entry && isString(entry.dateOfBirth) &&
        'ssn' in entry && isString(entry.ssn) &&
        'gender' in entry && isString(entry.gender) && isGender(entry.gender) &&
        'occupation' in entry && isString(entry.occupation)
    );
};


export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};