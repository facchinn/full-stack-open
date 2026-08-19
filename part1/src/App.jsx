import { useState } from 'react'
import './App.css'

const courses = [
  {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      { id: 1, name: 'Fundamentals of React', exercises: 10 },
      { id: 2, name: 'Using props to pass data', exercises: 7 },
      { id: 3, name: 'State of a component', exercises: 14 },
    ],
  },
]

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place.',
]

const Button = ({ onClick, children, active = false }) => (
  <button className={active ? 'active' : ''} onClick={onClick} type="button">
    {children}
  </button>
)

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <article className="card course">
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} <strong>{part.exercises}</strong>
        </p>
      ))}
      <p className="total">Total of {total} exercises</p>
    </article>
  )
}

const CourseInfo = () => (
  <section>
    <header className="section-heading">
      <span>Ejercicios 1.1–1.5</span>
      <h1>Course information</h1>
    </header>
    <div className="stack">{courses.map((course) => <Course key={course.id} course={course} />)}</div>
  </section>
)

const StatisticLine = ({ label, value, suffix = '' }) => (
  <tr>
    <th>{label}</th>
    <td>{value}{suffix}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) return <p className="empty">No feedback given</p>

  const average = (good - bad) / all
  const positive = (good / all) * 100

  return (
    <table>
      <tbody>
        <StatisticLine label="good" value={good} />
        <StatisticLine label="neutral" value={neutral} />
        <StatisticLine label="bad" value={bad} />
        <StatisticLine label="all" value={all} />
        <StatisticLine label="average" value={average.toFixed(2)} />
        <StatisticLine label="positive" value={positive.toFixed(1)} suffix=" %" />
      </tbody>
    </table>
  )
}

const Unicafe = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <section>
      <header className="section-heading">
        <span>Ejercicios 1.6–1.11</span>
        <h1>Unicafe feedback</h1>
      </header>
      <article className="card">
        <h2>Give feedback</h2>
        <div className="actions">
          <Button onClick={() => setGood(good + 1)}>good</Button>
          <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
          <Button onClick={() => setBad(bad + 1)}>bad</Button>
        </div>
        <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </article>
    </section>
  )
}

const Anecdotes = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(() => Array(anecdotes.length).fill(0))
  const mostVotedIndex = votes.indexOf(Math.max(...votes))

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const next = () => {
    let index = selected
    while (index === selected && anecdotes.length > 1) {
      index = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(index)
  }

  return (
    <section>
      <header className="section-heading">
        <span>Ejercicios 1.12–1.14</span>
        <h1>Anecdote of the day</h1>
      </header>
      <article className="card quote-card">
        <blockquote>{anecdotes[selected]}</blockquote>
        <p className="votes">has {votes[selected]} votes</p>
        <div className="actions">
          <Button onClick={vote}>vote</Button>
          <Button onClick={next}>next anecdote</Button>
        </div>
      </article>
      <h2 className="subheading">Anecdote with most votes</h2>
      <article className="card quote-card">
        <blockquote>{anecdotes[mostVotedIndex]}</blockquote>
        <p className="votes">has {votes[mostVotedIndex]} votes</p>
      </article>
    </section>
  )
}

const views = [
  { id: 'course', label: 'Course info', component: CourseInfo },
  { id: 'unicafe', label: 'Unicafe', component: Unicafe },
  { id: 'anecdotes', label: 'Anecdotes', component: Anecdotes },
]

const App = () => {
  const [view, setView] = useState('course')
  const CurrentView = views.find((item) => item.id === view).component

  return (
    <div className="app-shell">
      <aside>
        <a className="brand" href="#top" aria-label="Inicio">
          <span>FS</span>
          <strong>Part 01</strong>
        </a>
        <nav aria-label="Ejercicios de la parte 1">
          {views.map((item, index) => (
            <button
              key={item.id}
              className={view === item.id ? 'nav-item selected' : 'nav-item'}
              onClick={() => setView(item.id)}
              type="button"
            >
              <span>0{index + 1}</span>{item.label}
            </button>
          ))}
        </nav>
        <p className="aside-note">React fundamentals<br />Full Stack Open</p>
      </aside>
      <main id="top"><CurrentView /></main>
    </div>
  )
}

export default App
