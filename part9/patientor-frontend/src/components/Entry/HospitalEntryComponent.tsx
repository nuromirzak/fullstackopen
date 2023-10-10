import MasksIcon from '@mui/icons-material/Masks';
import { Diagnosis, HospitalEntry } from '../../types';

interface HospitalEntryProps {
    entry: HospitalEntry;
    diagnoses: Diagnosis[];
}

const HospitalEntryComponent = ({ entry, diagnoses }: HospitalEntryProps) => {
    return (
        <div>
            <p>
                {entry.date}  <MasksIcon />
            </p>
            <i>{entry.description}</i>
            <ol>
                {entry.diagnosisCodes?.map((code: string) => (
                    <li key={code}>{code} | {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}</li>
                ))}
            </ol>
            <p>Discharged on {entry.discharge.date} with criteria {entry.discharge.criteria}</p>
            <p>Diagnose by {entry.specialist}</p>
        </div>
    );
};

export default HospitalEntryComponent;