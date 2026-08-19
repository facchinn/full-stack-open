import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { PageTitle } from './Authors'
export default function Books({ recommendedGenre }) {
  const [genre, setGenre] = useState(recommendedGenre || '')
  const { data, loading } = useQuery(ALL_BOOKS, { variables: { genre: genre || null } })
  const allResult = useQuery(ALL_BOOKS)
  if (loading) return <p>Loading books…</p>
  const genres = [...new Set((allResult.data?.allBooks || []).flatMap((book) => book.genres))]
  return <section><PageTitle index="02" title={recommendedGenre ? 'For you' : 'Books'} subtitle={recommendedGenre ? `Selected from your favorite genre: ${recommendedGenre}` : 'Browse the library catalogue'} /><div className="filters"><button className={!genre ? 'active' : ''} onClick={() => setGenre('')}>All</button>{genres.map((item) => <button className={genre === item ? 'active' : ''} onClick={() => setGenre(item)} key={item}>{item}</button>)}</div><div className="book-grid">{data.allBooks.map((book, index) => <article key={book.id}><span>{String(index + 1).padStart(2, '0')}</span><h2>{book.title}</h2><p>{book.author.name}</p><footer><strong>{book.published}</strong><small>{book.genres.join(' · ')}</small></footer></article>)}</div></section>
}
