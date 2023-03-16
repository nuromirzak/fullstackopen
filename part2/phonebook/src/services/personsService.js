import axios from "axios";
const personsUrl = "/api/persons";

const addPhoneNumber = phone => {
    const promise = axios.post(personsUrl, phone);
    return promise.then(response => response.data);
};

const getAll = () => {
  const promise = axios.get(personsUrl);
  return promise.then((response) => response.data);
};

const update = (id, newObject) => {
  const promise = axios.put(`${personsUrl}/${id}`, newObject);
  return promise.then((response) => response.data);
};

const deletePhoneNumber = (id) => {
  const promise = axios.delete(`${personsUrl}/${id}`);
  return promise.then((response) => response.data);
};

const service = { addPhoneNumber, getAll, update, deletePhoneNumber };

export default service;
