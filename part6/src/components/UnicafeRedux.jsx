import { useReducer } from 'react'
import reducer, { initialState } from '../reducers/unicafeReducer'
export default function UnicafeRedux() {
  const [feedback, dispatch] = useReducer(reducer, initialState)
  return <section><header className="hero"><p>Exercises 6.1–6.2</p><h1>Unicafe</h1><span>Reducer fundamentals</span></header><div className="tools"><div><p>Collect feedback with a pure reducer.</p></div><div className="actions"><button onClick={() => dispatch({ type: 'GOOD' })}>Good</button><button onClick={() => dispatch({ type: 'OK' })}>Ok</button><button onClick={() => dispatch({ type: 'BAD' })}>Bad</button><button onClick={() => dispatch({ type: 'ZERO' })}>Reset</button></div></div><div className="anecdotes"><article><span className="number">01</span><blockquote>Good</blockquote><footer><span>{feedback.good} responses</span></footer></article><article><span className="number">02</span><blockquote>Ok</blockquote><footer><span>{feedback.ok} responses</span></footer></article><article><span className="number">03</span><blockquote>Bad</blockquote><footer><span>{feedback.bad} responses</span></footer></article></div></section>
}
