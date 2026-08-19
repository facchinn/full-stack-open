import axios from 'axios'
const baseUrl = '/api/anecdotes'
export const getAll = () => axios.get(baseUrl).then((response) => response.data)
export const create = (content) => axios.post(baseUrl, { content, votes: 0 }).then((response) => response.data)
export const vote = (anecdote) => axios.put(`${baseUrl}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 }).then((response) => response.data)
