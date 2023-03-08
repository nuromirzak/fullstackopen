import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setCurrentFilter(event.target.value);
  };

  const addPhoneNumber = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(personObject));

    setNewNumber("");
    setNewName("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log("promise fulfilled", response.data);
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={currentFilter} handleFilterChange={handleFilterChange} />

      <PersonForm
        addPhoneNumber={addPhoneNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Persons persons={persons} currentFilter={currentFilter} />
    </div>
  );
};

export default App;
