import { useAnecdoteActions, useNotificationActions } from '../store'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const { notify } = useNotificationActions()

  const createAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()

    if (!content) return

    await add(content)
    notify(`you added '${content}'`)
    event.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
