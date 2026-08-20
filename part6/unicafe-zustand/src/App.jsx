import {
  useBad,
  useFeedbackActions,
  useGood,
  useNeutral
} from './store'

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = () => {
  const good = useGood()
  const neutral = useNeutral()
  const bad = useBad()
  const all = good + neutral + bad

  if (all === 0) {
    return <p>No feedback given</p>
  }

  const average = (good - bad) / all
  const positive = (good / all) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  const { voteGood, voteNeutral, voteBad } = useFeedbackActions()

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={voteGood}>good</Button>
      <Button onClick={voteNeutral}>neutral</Button>
      <Button onClick={voteBad}>bad</Button>

      <h1>statistics</h1>
      <Statistics />
    </div>
  )
}

export default App
