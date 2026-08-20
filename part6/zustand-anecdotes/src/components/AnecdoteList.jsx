import {
  useAnecdoteActions,
  useAnecdotes,
  useNotificationActions
} from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions()
  const { notify } = useNotificationActions()

  const handleVote = async anecdote => {
    await vote(anecdote)
    notify(`you voted '${anecdote.content}'`)
  }

  const handleRemove = async anecdote => {
    await remove(anecdote.id)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id} style={{ marginBottom: 12 }}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes{' '}
            <button onClick={() => handleVote(anecdote)}>vote</button>{' '}
            {anecdote.votes === 0 && (
              <button onClick={() => handleRemove(anecdote)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
