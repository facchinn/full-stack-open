import { beforeEach, describe, test } from 'node:test'
import assert from 'node:assert/strict'
import supertest from 'supertest'
import app from '../src/app.js'
import { reset } from '../src/repositories/personRepository.js'

const api = supertest(app)

describe('phonebook API', () => {
  beforeEach(() => reset())

  test('returns persons as JSON', async () => {
    const response = await api.get('/api/persons').expect(200).expect('Content-Type', /application\/json/)
    assert.equal(response.body.length, 2)
  })

  test('creates a valid person', async () => {
    const response = await api.post('/api/persons').send({ name: 'Grace Hopper', number: '12-345678' }).expect(201)
    assert.equal(response.body.name, 'Grace Hopper')
    await api.get('/api/persons').expect((result) => assert.equal(result.body.length, 3))
  })

  test('rejects missing and invalid data', async () => {
    await api.post('/api/persons').send({ name: 'No Number' }).expect(400)
    await api.post('/api/persons').send({ name: 'Al', number: '123' }).expect(400)
  })

  test('updates and deletes a person', async () => {
    await api.put('/api/persons/1').send({ name: 'Arto Hellas', number: '99-999999' }).expect(200)
    await api.delete('/api/persons/1').expect(204)
    await api.get('/api/persons/1').expect(404)
  })
})
