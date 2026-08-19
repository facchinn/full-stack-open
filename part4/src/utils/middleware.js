import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { SECRET } from './config.js'
import { error } from './logger.js'

export const requestLogger = (request, _response, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(request.method, request.path, request.body)
  }
  next()
}

export const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization')
  request.token = authorization?.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null
  next()
}

export const userExtractor = async (request, response, next) => {
  if (!request.token) return response.status(401).json({ error: 'token missing' })
  const decoded = jwt.verify(request.token, SECRET)
  if (!decoded.id) return response.status(401).json({ error: 'token invalid' })
  request.user = await User.findById(decoded.id)
  if (!request.user) return response.status(401).json({ error: 'user no longer exists' })
  next()
}

export const unknownEndpoint = (_request, response) => response.status(404).json({ error: 'unknown endpoint' })

export const errorHandler = (exception, _request, response, next) => {
  error(exception.message)
  if (exception.name === 'CastError') return response.status(400).json({ error: 'malformatted id' })
  if (exception.name === 'ValidationError') return response.status(400).json({ error: exception.message })
  if (exception.name === 'MongoServerError' && exception.message.includes('E11000')) return response.status(400).json({ error: 'username must be unique' })
  if (exception.name === 'JsonWebTokenError') return response.status(401).json({ error: 'token invalid' })
  if (exception.name === 'TokenExpiredError') return response.status(401).json({ error: 'token expired' })
  next(exception)
}
