import { useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import useField from '../hooks/useField'
import useCountry from '../hooks/useCountry'

const initialAnecdotes = [
  { id: '1', content: 'If it hurts, do it more often.', author: 'Jez Humble', info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html', votes: 0 },
  { id: '2', content: 'Premature optimization is the root of all evil.', author: 'Donald Knuth', info: 'https://wiki.c2.com/?PrematureOptimization', votes: 0 },
]

function AnecdoteList({ anecdotes }) {
  const navigate = useNavigate()
  const content = useField('text', { required: true })
  const author = useField('text', { required: true })
  const create = (event) => { event.preventDefault(); const id = crypto.randomUUID(); anecdotes.set((items) => items.concat({ id, content: content.input.value, author: author.input.value, info: '', votes: 0 })); content.reset(); author.reset(); navigate(`/labs/anecdotes/${id}`) }
  return <section className="lab"><Link className="back" to="/labs">← Hook labs</Link><h1>Routed anecdotes</h1><ul>{anecdotes.value.map((item) => <li key={item.id}><Link to={`/labs/anecdotes/${item.id}`}>{item.content}</Link></li>)}</ul><form className="create-form" onSubmit={create}><h2>Create new</h2><div><label>Content<input {...content.input} /></label><label>Author<input {...author.input} /></label></div><button>Create & navigate</button></form></section>
}

function AnecdoteDetail({ items }) {
  const { id } = useParams()
  const anecdote = items.find((item) => item.id === id)
  return <section className="lab"><Link className="back" to="/labs/anecdotes">← Anecdotes</Link>{anecdote ? <><p className="eyebrow">{anecdote.author}</p><h1>{anecdote.content}</h1>{anecdote.info && <a href={anecdote.info}>More information ↗</a>}</> : <h1>Not found</h1>}</section>
}

function CountryFinder() {
  const [query, setQuery] = useState('')
  const country = useCountry(query)
  return <section className="lab"><Link className="back" to="/labs">← Hook labs</Link><h1>Country hook</h1><form onSubmit={(event) => { event.preventDefault(); setQuery(event.target.country.value) }} className="create-form"><label>Country name<input name="country" /></label><button>Find</button></form>{country?.found === false && <p>Country not found.</p>}{country?.found && <article className="country-result"><img src={country.data.flags.svg} alt={country.data.flags.alt} /><div><h2>{country.data.name.common}</h2><p>{country.data.capital?.[0]} · population {country.data.population.toLocaleString()}</p></div></article>}</section>
}

export default function Labs() {
  const [items, setItems] = useState(initialAnecdotes)
  return <Routes><Route index element={<section><header className="page-heading"><div><p className="eyebrow">Exercises 7.1–7.8</p><h1>Router &<br /><em>hook labs.</em></h1></div></header><div className="people-grid"><Link to="anecdotes"><h2>Routed anecdotes</h2><p>Navigation, URL parameters and useField</p><strong>Open lab →</strong></Link><Link to="countries"><h2>Country finder</h2><p>A reusable asynchronous useCountry hook</p><strong>Open lab →</strong></Link></div></section>} /><Route path="anecdotes" element={<AnecdoteList anecdotes={{ value: items, set: setItems }} />} /><Route path="anecdotes/:id" element={<AnecdoteDetail items={items} />} /><Route path="countries" element={<CountryFinder />} /></Routes>
}
