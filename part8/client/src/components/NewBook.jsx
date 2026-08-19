import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { PageTitle } from './Authors'
export default function NewBook({ notify, onDone }) {
  const [form, setForm] = useState({ title: '', author: '', published: '', genre: '' })
  const [genres, setGenres] = useState([])
  const [addBook] = useMutation(ADD_BOOK, { refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }], onCompleted: (book) => { notify(`Added “${book.addBook.title}”`); onDone() }, onError: (error) => notify(error.message, 'error') })
  const change = (key) => (event) => setForm({ ...form, [key]: event.target.value })
  const addGenre = () => { if (form.genre.trim()) setGenres([...genres, form.genre.trim()]); setForm({ ...form, genre: '' }) }
  const submit = (event) => { event.preventDefault(); addBook({ variables: { title: form.title, author: form.author, published: Number(form.published), genres } }) }
  return <section><PageTitle index="03" title="Add book" subtitle="Extend the shared catalogue" /><form className="new-book" onSubmit={submit}><label>Title<input value={form.title} onChange={change('title')} required /></label><label>Author<input value={form.author} onChange={change('author')} required /></label><label>Published<input type="number" value={form.published} onChange={change('published')} required /></label><label>Genres<div className="genre-input"><input value={form.genre} onChange={change('genre')} /><button type="button" onClick={addGenre}>Add</button></div></label><div className="genre-list">{genres.map((genre) => <span key={genre}>{genre}</span>)}</div><button className="submit">Save book →</button></form></section>
}
