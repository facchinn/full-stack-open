import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Layout from './components/Layout'
import Login from './components/Login'
import BlogList from './components/BlogList'
import BlogDetail from './components/BlogDetail'
import { UserDetail, Users } from './components/Users'
import Notification from './components/Notification'
import Labs from './components/Labs'
import { createBlog, getBlogs, login, setToken } from './services/api'
import { useNotification } from './context/NotificationContext'

export default function App() {
  const [user, setUser] = useState(null)
  const client = useQueryClient()
  const { notify } = useNotification()
  const blogs = useQuery({ queryKey: ['blogs'], queryFn: getBlogs, enabled: Boolean(user) })
  const createMutation = useMutation({ mutationFn: createBlog, onSuccess: (blog) => { client.invalidateQueries({ queryKey: ['blogs'] }); notify(`Added “${blog.title}”`) }, onError: (error) => notify(error.response?.data?.error || 'Could not create blog', 'error') })

  useEffect(() => {
    const stored = window.localStorage.getItem('readlogUser')
    if (stored) { const parsed = JSON.parse(stored); setUser(parsed); setToken(parsed.token) }
  }, [])

  const handleLogin = async (credentials) => {
    try { const loggedUser = await login(credentials); setUser(loggedUser); setToken(loggedUser.token); window.localStorage.setItem('readlogUser', JSON.stringify(loggedUser)) }
    catch { notify('Invalid username or password', 'error') }
  }
  const logout = () => { setUser(null); setToken(null); window.localStorage.removeItem('readlogUser'); client.clear() }

  return <><Notification /><Routes><Route element={<Layout user={user} logout={logout} />}><Route path="/login" element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} /><Route path="/" element={user ? <BlogList blogs={blogs.data || []} onCreate={(blog) => createMutation.mutate(blog)} /> : <Navigate to="/login" replace />} /><Route path="/blogs/:id" element={user ? <BlogDetail user={user} /> : <Navigate to="/login" replace />} /><Route path="/users" element={user ? <Users /> : <Navigate to="/login" replace />} /><Route path="/users/:id" element={user ? <UserDetail /> : <Navigate to="/login" replace />} /><Route path="/labs/*" element={user ? <Labs /> : <Navigate to="/login" replace />} /><Route path="*" element={<Navigate to="/" />} /></Route></Routes></>
}
