import { Alert, Typography } from "@mui/material";
import { Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from '../../services/patients';
import { useEffect, useState } from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const getIcon = function (gender: Gender) {
    switch (gender) {
        case Gender.Female:
            return <FemaleIcon />;
        case Gender.Male:
            return <MaleIcon />;
        case Gender.Other:
            return <TransgenderIcon />;
        default:
            return <span>Who are you?</span>;
    }
};

const PatientProfile = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [error, setError] = useState<string | null>(null);

    const id = useParams<{ id?: string }>()?.id;

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const fetchedPatient = await patientService.getOne(id);
                    setPatient(fetchedPatient);
                } catch (err) {
                    setError(`Patient with id ${id} not found`);
                }
            })();
        } else {
            setError("No id provided");
        }
    }, [id]);

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!patient) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h3">
                {patient.name}
                {getIcon(patient.gender)}
            </Typography>
            <Typography>
                ssn: {patient.ssn}
            </Typography>
            <Typography>
                occupation: {patient.occupation}
            </Typography>
        </div>
    );
};

export default PatientProfile;
