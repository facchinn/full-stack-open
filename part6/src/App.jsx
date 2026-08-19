import { useState } from 'react'
import QueryAnecdotes from './components/QueryAnecdotes'
import ReduxAnecdotes from './components/ReduxAnecdotes'
import UnicafeRedux from './components/UnicafeRedux'

export default function App() {
  const [mode, setMode] = useState('redux')

  const renderExercise = () => {
    if (mode === 'query') return <QueryAnecdotes />
    if (mode === 'unicafe') return <UnicafeRedux />
    return <ReduxAnecdotes />
  }

  return (
    <div className="shell">
      <nav>
        <strong>Part 06</strong>
        <div>
          <button
            type="button"
            className={mode === 'redux' ? 'active' : ''}
            onClick={() => setMode('redux')}
          >
            Redux
          </button>
          <button
            type="button"
            className={mode === 'query' ? 'active' : ''}
            onClick={() => setMode('query')}
          >
            React Query
          </button>
          <button
            type="button"
            className={mode === 'unicafe' ? 'active' : ''}
            onClick={() => setMode('unicafe')}
          >
            Unicafe
          </button>
        </div>
      </nav>

      <main>{renderExercise()}</main>
    </div>
  )
}
