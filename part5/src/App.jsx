import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

export default function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const formRef = useRef()

  useEffect(() => {
    blogService.getAll().then(setBlogs).catch(() => setNotification({ type: 'error', message: 'The backend is not available.' }))
    const stored = window.localStorage.getItem('loggedBlogAppUser')
    if (stored) {
      const savedUser = JSON.parse(stored)
      setUser(savedUser)
      blogService.setToken(savedUser.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    window.setTimeout(() => setNotification(null), 4000)
  }

  const login = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    } catch { notify('Wrong username or password', 'error') }
  }

  const logout = () => { window.localStorage.removeItem('loggedBlogAppUser'); setUser(null) }

  const createBlog = async (values) => {
    try {
      const created = await blogService.create(values)
      setBlogs(blogs.concat(created))
      formRef.current.toggleVisibility()
      notify(`A new blog “${created.title}” by ${created.author} was added`)
    } catch (error) { notify(error.response?.data?.error || 'Could not create the blog', 'error') }
  }

  const like = async (blog) => {
    const updated = await blogService.update({ ...blog, user: blog.user?.id || blog.user, likes: blog.likes + 1 })
    setBlogs(blogs.map((item) => item.id === updated.id ? updated : item))
  }

  const remove = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return
    await blogService.remove(blog.id)
    setBlogs(blogs.filter((item) => item.id !== blog.id))
    notify(`Removed ${blog.title}`)
  }

  if (!user) return <main className="login-layout"><Notification notification={notification} /><LoginForm onLogin={login} /></main>

  const sortedBlogs = [...blogs].sort((first, second) => second.likes - first.likes)
  return (
    <div className="app-shell">
      <header className="topbar"><a href="#top" className="logo">BL<span>·</span></a><div><span>{user.name || user.username}</span><button onClick={logout}>Log out</button></div></header>
      <main id="top" className="content">
        <header className="hero"><p className="kicker">Your library · {String(blogs.length).padStart(2, '0')}</p><h1>The Bloglist</h1><p>Ideas, references and thoughtful writing — collected in one quiet place.</p></header>
        <Notification notification={notification} />
        <Togglable buttonLabel="+ New blog" ref={formRef}><BlogForm createBlog={createBlog} /></Togglable>
        <div className="blog-list">{sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} onLike={like} onRemove={remove} currentUser={user} />)}</div>
      </main>
    </div>
  )
}
