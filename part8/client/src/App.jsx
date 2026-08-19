import { useEffect, useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { ALL_BOOKS, BOOK_ADDED, ME } from './queries'

export default function App() {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(() => window.localStorage.getItem('library-user-token'))
  const [notification, setNotification] = useState(null)
  const client = useApolloClient()
  const me = useQuery(ME, { skip: !token })
  const notify = (message, type = 'success') => { setNotification({ message, type }); window.setTimeout(() => setNotification(null), 4000) }

  useSubscription(BOOK_ADDED, { onData: ({ data }) => {
    const added = data.data.bookAdded
    client.cache.updateQuery({ query: ALL_BOOKS }, (cached) => cached && !cached.allBooks.some((book) => book.id === added.id) ? { allBooks: cached.allBooks.concat(added) } : cached)
    notify(`New book added: ${added.title}`)
  } })

  useEffect(() => { if (!token && page === 'recommend') setPage('books') }, [token, page])
  const login = (value) => { window.localStorage.setItem('library-user-token', value); setToken(value); setPage('books'); client.resetStore() }
  const logout = () => { setToken(null); window.localStorage.clear(); client.clearStore(); setPage('authors') }
  const pages = [{ id: 'authors', label: 'Authors' }, { id: 'books', label: 'Books' }, ...(token ? [{ id: 'add', label: 'Add book' }, { id: 'recommend', label: 'For you' }] : [{ id: 'login', label: 'Login' }])]

  return <div className="shell"><header><button className="brand" onClick={() => setPage('authors')}>Bibliotheca<span>08</span></button><nav>{pages.map((item) => <button className={page === item.id ? 'active' : ''} key={item.id} onClick={() => setPage(item.id)}>{item.label}</button>)}</nav>{token ? <button className="logout" onClick={logout}>Log out</button> : <span />}</header>{notification && <div className={`notification ${notification.type}`}>{notification.message}</div>}<main>{page === 'authors' && <Authors token={token} notify={notify} />}{page === 'books' && <Books />}{page === 'add' && <NewBook notify={notify} onDone={() => setPage('books')} />}{page === 'recommend' && <Books recommendedGenre={me.data?.me?.favoriteGenre} />}{page === 'login' && <Login onLogin={login} notify={notify} />}</main><footer><span>GraphQL Library</span><span>Full Stack Open · Part 08</span></footer></div>
}
