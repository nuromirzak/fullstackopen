import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personsService from "./services/personsService";

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
      console.log("updating the existing phone number");

      const person = persons.find((person) => person.name === newName);

      const updatedPerson = { ...person, number: newNumber };
    

      personsService
        .update(person.id, updatedPerson)
        .then((returnedPerson) => {
          console.log("promise fulfilled", returnedPerson);
          setPersons(
            persons.map((person) =>
              person.name !== newName ? person : returnedPerson
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService
      .addPhoneNumber(personObject)
      .then((returnedPerson) => {
        console.log("promise fulfilled", returnedPerson);
        setPersons(persons.concat(returnedPerson));
      })
      .catch((error) => {
        console.log(error);
      });

    setNewNumber("");
    setNewName("");
  };

  const askToDelete = (name) => {
    if (window.confirm(`Delete ${name}?`)) {
      const person = persons.find((person) => person.name === name);

      personsService
        .deletePhoneNumber(person.id)
        .then((response) => {
          console.log("promise fulfilled", response);
          setPersons(persons.filter((person) => person.name !== name));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        console.log("promise fulfilled", initialPersons);
        setPersons(initialPersons);
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

      <Persons
        persons={persons}
        currentFilter={currentFilter}
        askToDelete={askToDelete}
      />
    </div>
  );
};

export default App;
