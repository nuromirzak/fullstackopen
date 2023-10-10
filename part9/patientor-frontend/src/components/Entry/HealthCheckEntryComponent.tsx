import { Diagnosis, HealthCheckEntry } from "../../types";
import StarIcon from '@mui/icons-material/Star';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { HealthCheckRating } from "../../types";

interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[];
}

const HealthCheckEntryComponent = ({ entry, diagnoses }: HealthCheckEntryProps) => {
    const maxHealthRating = Math.max(...Object.values(HealthCheckRating).filter((value) => typeof value === 'number') as number[]) + 1;
    console.log('maxHealthRating', maxHealthRating);

    return (
        <div>
            <p>
                {entry.date}  <MedicalServicesIcon />
            </p>
            <i>{entry.description}</i>
            <ol>
                {entry.diagnosisCodes?.map((code: string) => (
                    <li key={code}>{code} | {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}</li>
                ))}
            </ol>
            <div>
                {Array.from({ length: maxHealthRating - entry.healthCheckRating }, (_, index) => (
                    <StarIcon key={index} />
                ))}
            </div>
            <p>Diagnose by {entry.specialist}</p>
        </div>
    );
};

export default HealthCheckEntryComponent;