import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const { data } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
    );

    return data;
};

const getOne = async (id: string) => {
    const all = await getAll();
    return all.find(d => d.code === id);
};

export default {
    getAll,
    getOne
};