import mongoose from 'mongoose'
import app from './app.js'
import { MONGODB_URI, PORT } from './utils/config.js'
import { info } from './utils/logger.js'

if (!MONGODB_URI) throw new Error('MONGODB_URI is required')
mongoose.set('strictQuery', false)
await mongoose.connect(MONGODB_URI)
info('connected to MongoDB')
app.listen(PORT, () => info(`bloglist server running on port ${PORT}`))
