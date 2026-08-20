import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    reset,
    input: {
      type,
      value,
      onChange
    }
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    let active = true

    anecdoteService.getAll().then(data => {
      if (active) {
        setAnecdotes(data)
      }
    })

    return () => {
      active = false
    }
  }, [])

  const addAnecdote = async anecdote => {
    const created = await anecdoteService.createNew(anecdote)
    setAnecdotes(current => current.concat(created))
    return created
  }

  const deleteAnecdote = async id => {
    await anecdoteService.remove(id)
    setAnecdotes(current => current.filter(anecdote => anecdote.id !== id))
  }

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote
  }
}
