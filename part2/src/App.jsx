import { useState } from 'react'
import CourseInfo from './components/CourseInfo'
import Phonebook from './components/Phonebook'
import Countries from './components/Countries'

const pages = [
  { id: 'courses', label: 'Courses', component: CourseInfo },
  { id: 'phonebook', label: 'Phonebook', component: Phonebook },
  { id: 'countries', label: 'Countries', component: Countries },
]

export default function App() {
  const [page, setPage] = useState('courses')
  const CurrentPage = pages.find((item) => item.id === page).component

  return (
    <div className="app">
      <header className="topbar">
        <button className="wordmark" onClick={() => setPage('courses')}><span>02</span> Full Stack Open</button>
        <nav>{pages.map((item) => <button className={page === item.id ? 'current' : ''} key={item.id} onClick={() => setPage(item.id)}>{item.label}</button>)}</nav>
      </header>
      <main><CurrentPage /></main>
    </div>
  )
}
