import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

interface OccupationalHealthcareEntryProps {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryComponent = ({ entry, diagnoses }: OccupationalHealthcareEntryProps) => {
    return (
        <div>
            <p>
                {entry.date}  <BusinessCenterIcon /> {entry.employerName}
            </p>
            <i>{entry.description}</i>
            <ol>
                {entry.diagnosisCodes?.map((code: string) => (
                    <li key={code}>{code} | {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}</li>
                ))}
            </ol>
            {entry.sickLeave && <p>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>}
            <p>Diagnose by {entry.specialist}</p>
        </div>
    );
};

export default OccupationalHealthcareEntryComponent;
