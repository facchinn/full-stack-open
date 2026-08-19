import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { STATIC_DIR } from './config.js'
import * as persons from './repositories/personRepository.js'
import { errorHandler, unknownEndpoint } from './middleware.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

morgan.token('body', (request) => request.method === 'POST' ? JSON.stringify(request.body) : '')
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static(path.resolve(__dirname, '..', STATIC_DIR)))

app.get('/info', async (_request, response) => {
  const total = await persons.count()
  response.send(`<p>Phonebook has info for ${total} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons', async (_request, response) => response.json(await persons.all()))

app.get('/api/persons/:id', async (request, response) => {
  const person = await persons.findById(request.params.id)
  if (!person) return response.status(404).end()
  response.json(person)
})

app.post('/api/persons', async (request, response) => {
  const name = request.body.name?.trim()
  const number = request.body.number?.trim()
  if (!name || !number) return response.status(400).json({ error: 'name and number are required' })

  const duplicate = (await persons.all()).find((person) => person.name.toLowerCase() === name.toLowerCase())
  if (duplicate) return response.status(400).json({ error: 'name must be unique' })
  response.status(201).json(await persons.create({ name, number }))
})

app.put('/api/persons/:id', async (request, response) => {
  const updated = await persons.update(request.params.id, {
    name: request.body.name?.trim(),
    number: request.body.number?.trim(),
  })
  if (!updated) return response.status(404).end()
  response.json(updated)
})

app.delete('/api/persons/:id', async (request, response) => {
  const removed = await persons.remove(request.params.id)
  response.status(removed ? 204 : 404).end()
})

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
