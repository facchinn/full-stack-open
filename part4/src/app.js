import cors from 'cors'
import express from 'express'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import { errorHandler, requestLogger, tokenExtractor, unknownEndpoint } from './utils/middleware.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)
app.get('/api/health', (_request, response) => response.json({ status: 'ok' }))
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

export default app
