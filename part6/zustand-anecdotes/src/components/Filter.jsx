import { useAnecdoteActions, useFilter } from '../store'

const Filter = () => {
  const filter = useFilter()
  const { setFilter } = useAnecdoteActions()

  return (
    <div style={{ marginBottom: 10 }}>
      filter{' '}
      <input
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
      />
    </div>
  )
}

export default Filter
