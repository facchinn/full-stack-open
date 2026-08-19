import { useEffect, useState } from 'react'
import personService from '../services/persons'
import Notification from './Notification'

export default function Phonebook() {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(setPersons).catch(() => {
      setNotification({ type: 'error', message: 'Start the JSON server with npm run server.' })
    })
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    window.setTimeout(() => setNotification(null), 3500)
  }

  const save = async (event) => {
    event.preventDefault()
    const existing = persons.find((person) => person.name.toLowerCase() === name.trim().toLowerCase())
    try {
      if (existing) {
        if (!window.confirm(`${existing.name} is already added. Replace the old number?`)) return
        const updated = await personService.update(existing.id, { ...existing, number: number.trim() })
        setPersons(persons.map((person) => person.id === existing.id ? updated : person))
        notify(`Updated ${updated.name}`)
      } else {
        const created = await personService.create({ name: name.trim(), number: number.trim() })
        setPersons(persons.concat(created))
        notify(`Added ${created.name}`)
      }
      setName('')
      setNumber('')
    } catch (error) {
      notify(error.response?.data?.error || 'The phonebook could not be updated', 'error')
    }
  }

  const remove = async (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) return
    try {
      await personService.remove(person.id)
      setPersons(persons.filter((candidate) => candidate.id !== person.id))
      notify(`Deleted ${person.name}`)
    } catch {
      setPersons(persons.filter((candidate) => candidate.id !== person.id))
      notify(`${person.name} was already removed from the server`, 'error')
    }
  }

  const visiblePersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <section>
      <div className="page-title"><p>2.6—2.17</p><h1>Phonebook</h1></div>
      <Notification notification={notification} />
      <div className="two-columns">
        <form className="panel form-panel" onSubmit={save}>
          <h2>Add a person</h2>
          <label>Name<input required value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label>Number<input required value={number} onChange={(event) => setNumber(event.target.value)} /></label>
          <button className="primary" type="submit">Save contact</button>
        </form>
        <div className="panel directory">
          <div className="directory-heading">
            <h2>Numbers <span>{visiblePersons.length}</span></h2>
            <input aria-label="Filter contacts" placeholder="Filter names…" value={filter} onChange={(event) => setFilter(event.target.value)} />
          </div>
          <ul>
            {visiblePersons.map((person) => (
              <li key={person.id}>
                <span className="avatar">{person.name.charAt(0)}</span>
                <span><strong>{person.name}</strong><small>{person.number}</small></span>
                <button className="danger" onClick={() => remove(person)} type="button">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
