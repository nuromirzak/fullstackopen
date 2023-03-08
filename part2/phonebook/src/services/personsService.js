import axios from "axios";

const addPhoneNumber = phone => {
    const promise = axios.post("http://localhost:3001/persons", phone);
    return promise.then(response => response.data);
};

const getAll = () => {
    const promise = axios.get("http://localhost:3001/persons");
    return promise.then(response => response.data);
};

const update = (id, newObject) => {
    const promise = axios.put(`http://localhost:3001/persons/${id}`, newObject);
    return promise.then(response => response.data);
};

const deletePhoneNumber = id => {
    const promise = axios.delete(`http://localhost:3001/persons/${id}`);
    return promise.then(response => response.data);
};

const service = { addPhoneNumber, getAll, update, deletePhoneNumber };

export default service;