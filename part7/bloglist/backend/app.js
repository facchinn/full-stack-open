const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

mongoose.set('strictQuery', false)
logger.info('connecting to MongoDB')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use('/api', (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
})

const frontendDist = path.resolve(__dirname, '../frontend/dist')
app.use(express.static(frontendDist))

app.use((request, response, next) => {
  if (request.method !== 'GET') return next()

  response.sendFile(path.join(frontendDist, 'index.html'), error => {
    if (error) next()
  })
})

module.exports = app
