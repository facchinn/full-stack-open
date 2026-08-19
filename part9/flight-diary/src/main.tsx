import { useEffect, useState, type FormEvent } from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { Visibility, Weather, type DiaryEntry, type NewDiaryEntry } from './types'
import './style.css'

const api = '/api/diaries'
function RadioGroup<T extends string>({ label, values, value, onChange }: { label: string; values: T[]; value: T; onChange: (value: T) => void }) { return <fieldset><legend>{label}</legend>{values.map((item) => <label key={item}><input type="radio" checked={value === item} onChange={() => onChange(item)} />{item}</label>)}</fieldset> }

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState(Weather.Sunny)
  const [visibility, setVisibility] = useState(Visibility.Good)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  useEffect(() => { axios.get<DiaryEntry[]>(api).then((response) => setDiaries(response.data)).catch(() => setError('Start the Part 9 backend on port 3002.')) }, [])
  const submit = async (event: FormEvent) => { event.preventDefault(); const entry: NewDiaryEntry = { date, weather, visibility, comment }; try { const response = await axios.post<DiaryEntry>(api, entry); setDiaries(diaries.concat(response.data)); setDate(''); setComment(''); setError('') } catch (caught) { setError(axios.isAxiosError(caught) ? caught.response?.data?.error || caught.message : 'Unknown error') } }
  return <main><header><p>Exercise 9.15–9.16</p><h1>Flight diary</h1><span>Conditions, visibility and the notes between.</span></header>{error && <div className="error">{error}</div>}<form onSubmit={submit}><label>Date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></label><RadioGroup label="Weather" values={Object.values(Weather)} value={weather} onChange={setWeather} /><RadioGroup label="Visibility" values={Object.values(Visibility)} value={visibility} onChange={setVisibility} /><label>Comment<input value={comment} onChange={(event) => setComment(event.target.value)} /></label><button>Record flight</button></form><section><h2>Diary entries <span>{diaries.length}</span></h2>{diaries.map((diary) => <article key={diary.id}><time>{diary.date}</time><div><strong>{diary.weather}</strong><span>{diary.visibility} visibility</span></div>{diary.comment && <p>{diary.comment}</p>}</article>)}</section></main>
}
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
