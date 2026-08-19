import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
export default function Authors({ token, notify }) {
  const { data, loading } = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }], onError: (error) => notify(error.message, 'error') })
  if (loading) return <p>Loading authors…</p>
  const submit = (event) => { event.preventDefault(); editAuthor({ variables: { name, born: Number(born) } }); setName(''); setBorn('') }
  return <section><PageTitle index="01" title="Authors" subtitle="The voices behind the collection" /><div className="data-table"><div className="row heading"><span>Name</span><span>Born</span><span>Books</span></div>{data.allAuthors.map((author) => <div className="row" key={author.id}><strong>{author.name}</strong><span>{author.born || '—'}</span><span>{author.bookCount}</span></div>)}</div>{token && <form className="edit-form" onSubmit={submit}><h2>Set birth year</h2><select value={name} onChange={(event) => setName(event.target.value)} required><option value="">Choose author</option>{data.allAuthors.map((author) => <option key={author.id}>{author.name}</option>)}</select><input type="number" placeholder="Year" value={born} onChange={(event) => setBorn(event.target.value)} required /><button>Update</button></form>}</section>
}
export function PageTitle({ index, title, subtitle }) { return <header className="page-title"><span>{index}</span><div><h1>{title}</h1><p>{subtitle}</p></div></header> }
