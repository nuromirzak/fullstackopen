import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personsService from "./services/personsService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [cssClass, setCssClass] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setCurrentFilter(event.target.value);
  };

  const flashMessage = (message, cssClass, duration) => {
    setMessage(message);
    setCssClass(cssClass);
    setTimeout(() => {
      setMessage(null);
      setCssClass("");
    }, duration);
  };

  const addPhoneNumber = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      updatePhoneNumber(newName);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService
      .addPhoneNumber(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        flashMessage(`Added ${newName}`, "success", 5000);
      })
      .catch((error) => {
        console.log(error);
        flashMessage(`Unkown error ${error.message}`, "danger", 5000);
      });

    setNewNumber("");
    setNewName("");
  };

  const updatePhoneNumber = (name) => {
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
        flashMessage(`Updated ${newName}`, "success", 5000);
      })
      .catch((error) => {
        console.log(error);
        flashMessage(`Unkown error ${error.message}`, "danger", 5000);
      });
  };

  const askToDelete = (name) => {
    if (window.confirm(`Delete ${name}?`)) {
      const person = persons.find((person) => person.name === name);

      personsService
        .deletePhoneNumber(person.id)
        .then((response) => {
          setPersons(persons.filter((person) => person.name !== name));
          flashMessage(`Deleted ${name}`, "success", 5000);
        })
        .catch((error) => {
          console.log(error);
          flashMessage(
            `Information of ${name} has already been removed`,
            "danger",
            5000
          );
        });
    }
  };

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        console.log("Successfullly initialized persons");
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} cssClass={cssClass} />

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
