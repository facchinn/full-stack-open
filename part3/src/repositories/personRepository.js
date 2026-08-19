import crypto from 'node:crypto'
import mongoose from 'mongoose'
import Person from '../models/person.js'

const initialPersons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
]

let memory = structuredClone(initialPersons)
const hasDatabase = () => mongoose.connection.readyState === 1

export const all = async () => hasDatabase() ? Person.find({}) : structuredClone(memory)
export const count = async () => hasDatabase() ? Person.countDocuments({}) : memory.length

export const findById = async (id) => {
  if (hasDatabase()) return Person.findById(id)
  return memory.find((person) => person.id === id) || null
}

export const create = async ({ name, number }) => {
  const candidate = new Person({ name, number })
  await candidate.validate()
  if (hasDatabase()) return candidate.save()
  const person = { id: crypto.randomUUID(), name, number }
  memory.push(person)
  return structuredClone(person)
}

export const update = async (id, values) => {
  const candidate = new Person(values)
  await candidate.validate()
  if (hasDatabase()) {
    return Person.findByIdAndUpdate(id, values, { new: true, runValidators: true, context: 'query' })
  }
  const index = memory.findIndex((person) => person.id === id)
  if (index < 0) return null
  memory[index] = { ...memory[index], ...values, id }
  return structuredClone(memory[index])
}

export const remove = async (id) => {
  if (hasDatabase()) return Person.findByIdAndDelete(id)
  const found = memory.some((person) => person.id === id)
  memory = memory.filter((person) => person.id !== id)
  return found
}

export const reset = () => { memory = structuredClone(initialPersons) }
