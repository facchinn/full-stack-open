export const unknownEndpoint = (_request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

export const errorHandler = (error, _request, response, next) => {
  if (error.name === 'CastError') return response.status(400).json({ error: 'malformatted id' })
  if (error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  next(error)
}
