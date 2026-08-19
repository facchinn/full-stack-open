import { useState } from 'react'
import './App.css'

const course = {
  name: 'Half Stack application development',
  parts: [
    { id: 1, name: 'Fundamentals of React', exercises: 10 },
    { id: 2, name: 'Using props to pass data', exercises: 7 },
    { id: 3, name: 'State of a component', exercises: 14 },
  ],
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place.',
]

const Button = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )
}

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (total, part) => total + part.exercises,
    0,
  )

  return (
    <div>
      <h3>{course.name}</h3>

      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}

      <p>
        <strong>Total of {totalExercises} exercises</strong>
      </p>
    </div>
  )
}

const CourseInfo = () => {
  return (
    <section className="exercise">
      <p className="exercise-number">Ejercicios 1.1–1.5</p>
      <h2>Course information</h2>
      <Course course={course} />
    </section>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <p className="statistic-line">
      <span>{text}</span>
      <strong>{value}</strong>
    </p>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return <p>No feedback given</p>
  }

  const average = (good - bad) / total
  const positivePercentage = (good / total) * 100

  return (
    <div className="statistics">
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average.toFixed(2)} />
      <StatisticLine
        text="positive"
        value={`${positivePercentage.toFixed(1)} %`}
      />
    </div>
  )
}

const Unicafe = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <section className="exercise">
      <p className="exercise-number">Ejercicios 1.6–1.11</p>
      <h2>Unicafe</h2>

      <h3>Give feedback</h3>
      <div className="buttons">
        <Button onClick={() => setGood(good + 1)}>good</Button>
        <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
        <Button onClick={() => setBad(bad + 1)}>bad</Button>
      </div>

      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </section>
  )
}

const Anecdotes = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const vote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  const showNext = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const mostVotedIndex = votes.indexOf(Math.max(...votes))

  return (
    <section className="exercise">
      <p className="exercise-number">Ejercicios 1.12–1.14</p>
      <h2>Anecdote of the day</h2>

      <blockquote>{anecdotes[selected]}</blockquote>
      <p>has {votes[selected]} votes</p>

      <div className="buttons">
        <Button onClick={vote}>vote</Button>
        <Button onClick={showNext}>next anecdote</Button>
      </div>

      <h3>Anecdote with most votes</h3>
      <blockquote>{anecdotes[mostVotedIndex]}</blockquote>
      <p>has {votes[mostVotedIndex]} votes</p>
    </section>
  )
}

const App = () => {
  return (
    <main className="container">
      <header className="page-header">
        <p>Full Stack Open · Parte 1</p>
        <h1>Fundamentos de React</h1>
        <span>
          Mis soluciones para courseinfo, unicafe y anecdotes.
        </span>
      </header>

      <CourseInfo />
      <Unicafe />
      <Anecdotes />
    </main>
  )
}

export default App
