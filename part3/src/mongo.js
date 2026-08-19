import mongoose from 'mongoose'
import { MONGODB_URI } from './config.js'
import Person from './models/person.js'

if (!MONGODB_URI) throw new Error('Set MONGODB_URI before running this script')
await mongoose.connect(MONGODB_URI)

if (process.argv.length === 2) {
  const people = await Person.find({})
  console.log('phonebook:')
  people.forEach((person) => console.log(`${person.name} ${person.number}`))
} else if (process.argv.length === 4) {
  const person = await new Person({ name: process.argv[2], number: process.argv[3] }).save()
  console.log(`added ${person.name} number ${person.number} to phonebook`)
} else {
  console.log('usage: npm run mongo -- "Name" "12-345678"')
}

await mongoose.connection.close()
