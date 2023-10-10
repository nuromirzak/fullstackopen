import { Diagnosis, Entry } from "../../types";
import diagnosesService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import HealthCheckEntryComponent from "./HealthCheckEntryComponent";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntryComponent";
import HospitalEntryComponent from "./HospitalEntryComponent";
import { Alert } from "@mui/material";

interface EntryProps {
    entry: Entry;
}

const EntryComponent = ({ entry }: EntryProps) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const diagnosesFromApi = await diagnosesService.getAll();
                setDiagnoses(diagnosesFromApi);
            } catch (e) {
                console.error(e);
            }
        };
        fetchDiagnoses();
    }, []);


    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntryComponent entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryComponent entry={entry} diagnoses={diagnoses} />;
        case "Hospital":
            return <HospitalEntryComponent entry={entry} diagnoses={diagnoses} />;
        default:
            return <Alert severity="error">Unknown entry type</Alert>;
    }
};

export default EntryComponent;
