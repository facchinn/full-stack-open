import { useState } from 'react'
import ReduxAnecdotes from './components/ReduxAnecdotes'
import QueryAnecdotes from './components/QueryAnecdotes'
import UnicafeRedux from './components/UnicafeRedux'

export default function App() {
  const [mode, setMode] = useState('redux')
  return <div className="shell"><nav><strong>Part 06</strong><div><button className={mode === 'redux' ? 'active' : ''} onClick={() => setMode('redux')}>Redux</button><button className={mode === 'query' ? 'active' : ''} onClick={() => setMode('query')}>React Query</button><button className={mode === 'unicafe' ? 'active' : ''} onClick={() => setMode('unicafe')}>Unicafe</button></div></nav><main>{mode === 'redux' ? <ReduxAnecdotes /> : mode === 'query' ? <QueryAnecdotes /> : <UnicafeRedux />}</main></div>
}
