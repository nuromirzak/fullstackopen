import { useState, useEffect } from 'react'
import axios from 'axios'
import peopleService from './peopleService'

const Filter = ({ search, setSearch }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, search }) => {
  const personsToShow = (search) => {
    if (search === '') {
      return persons
    }

    return persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <div>
      {
        personsToShow(search).map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(people => {
        console.log('people', people)
        setPersons(people)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    peopleService
      .create(personObject)
      .then(returnedPerson => {
        console.log('returnedPerson', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  )
}

export { App }