import mongoose from 'mongoose'
import app from './app.js'
import { MONGODB_URI, PORT } from './config.js'

if (MONGODB_URI) {
  mongoose.set('strictQuery', false)
  await mongoose.connect(MONGODB_URI)
  console.log('connected to MongoDB')
} else {
  console.warn('MONGODB_URI is missing; using the in-memory development repository')
}

app.listen(PORT, () => console.log(`phonebook server running on port ${PORT}`))
