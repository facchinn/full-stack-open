import Notification from './components/Notification'
import useAnecdotes from './hooks/useAnecdotes'

const App = () => {
  const {
    anecdotes,
    isPending,
    isError,
    addAnecdote,
    voteAnecdote
  } = useAnecdotes()

  const addNew = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnecdote(content)
  }

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id} style={{ marginBottom: 10 }}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes{' '}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}

      <h2>create new</h2>
      <form onSubmit={addNew}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
