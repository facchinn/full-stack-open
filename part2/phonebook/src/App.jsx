import React, { useEffect, useState } from 'react'
import personService from './services/persons.js'
import './styles.css'

const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
)

const PersonForm = ({ name, number, onNameChange, onNumberChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={onNumberChange} />
    </div>
    <button type="submit">add</button>
  </form>
)

const Persons = ({ persons, onDelete }) => (
  <div>
    {persons.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}{' '}
        <button type="button" onClick={() => onDelete(person)}>delete</button>
      </p>
    ))}
  </div>
)

const Notification = ({ notification }) => {
  if (!notification) return null
  return <div className={notification.type}>{notification.message}</div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data))
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    window.setTimeout(() => setNotification(null), 4000)
  }

  const addPerson = async (event) => {
    event.preventDefault()

    const name = newName.trim()
    const number = newNumber.trim()
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase(),
    )

    try {
      if (existingPerson) {
        const shouldUpdate = window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`,
        )
        if (!shouldUpdate) return

        const updatedPerson = await personService.update(existingPerson.id, {
          ...existingPerson,
          number,
        })
        setPersons(persons.map((person) =>
          person.id === existingPerson.id ? updatedPerson : person,
        ))
        showNotification(`Updated ${updatedPerson.name}`)
      } else {
        const createdPerson = await personService.create({ name, number })
        setPersons(persons.concat(createdPerson))
        showNotification(`Added ${createdPerson.name}`)
      }

      setNewName('')
      setNewNumber('')
    } catch (error) {
      if (existingPerson) {
        setPersons(persons.filter((person) => person.id !== existingPerson.id))
      }
      showNotification(
        error.response?.data?.error || `${name} was already removed from server`,
        'error',
      )
    }
  }

  const deletePerson = async (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) return

    try {
      await personService.remove(person.id)
      setPersons(persons.filter((item) => item.id !== person.id))
      showNotification(`Deleted ${person.name}`)
    } catch {
      setPersons(persons.filter((item) => item.id !== person.id))
      showNotification(`${person.name} was already removed from server`, 'error')
    }
  }

  const visiblePersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />

      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={(event) => setNewName(event.target.value)}
        onNumberChange={(event) => setNewNumber(event.target.value)}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={visiblePersons} onDelete={deletePerson} />
    </div>
  )
}

export default App
