import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote, initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setFilter } from '../reducers/filterReducer'
import { setNotification } from '../reducers/notificationReducer'

export default function ReduxAnecdotes() {
  const dispatch = useDispatch()
  const { anecdotes, filter, notification } = useSelector((state) => state)
  useEffect(() => { dispatch(initializeAnecdotes()) }, [dispatch])

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    if (!content) return
    await dispatch(createAnecdote(content))
    dispatch(setNotification(`You added “${content}”`))
    event.target.reset()
  }

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted for “${anecdote.content}”`))
  }

  const visible = anecdotes.filter((item) => item.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
  return <AnecdoteView title="Redux Toolkit" notification={notification} anecdotes={visible} onVote={vote} onCreate={create} filter={filter} onFilter={(value) => dispatch(setFilter(value))} />
}

export function AnecdoteView({ title, notification, anecdotes, onVote, onCreate, filter, onFilter, error }) {
  return (
    <>
      {notification && <div className="notification">{notification}</div>}
      {error && <div className="notification error">{error}</div>}
      <header className="hero"><p>State management laboratory</p><h1>Anecdotes</h1><span>{title}</span></header>
      <div className="tools">
        <label>Filter<input value={filter} onChange={(event) => onFilter(event.target.value)} placeholder="Find an anecdote" /></label>
        <form onSubmit={onCreate}><label>New anecdote<input name="anecdote" minLength="5" placeholder="Something memorable…" /></label><button>Add</button></form>
      </div>
      <div className="anecdotes">{anecdotes.map((anecdote, index) => <article key={anecdote.id}><span className="number">{String(index + 1).padStart(2, '0')}</span><blockquote>{anecdote.content}</blockquote><footer><span>{anecdote.votes} votes</span><button onClick={() => onVote(anecdote)}>Vote +</button></footer></article>)}</div>
    </>
  )
}
