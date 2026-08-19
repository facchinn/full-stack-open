import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import BlogDetail from './components/BlogDetail'
import BlogList from './components/BlogList'
import Labs from './components/Labs'
import Layout from './components/Layout'
import Login from './components/Login'
import Notification from './components/Notification'
import { UserDetail, Users } from './components/Users'
import { useNotification } from './context/NotificationContext'
import { createBlog, getBlogs, login, setToken } from './services/api'

export default function App() {
  const [user, setUser] = useState(null)
  const queryClient = useQueryClient()
  const { notify } = useNotification()

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    enabled: Boolean(user),
  })

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify(`Added “${blog.title}”`)
    },
    onError: (error) => {
      notify(error.response?.data?.error || 'Could not create blog', 'error')
    },
  })

  useEffect(() => {
    const storedUser = window.localStorage.getItem('readlogUser')

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setToken(parsedUser.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await login(credentials)
      setUser(loggedUser)
      setToken(loggedUser.token)
      window.localStorage.setItem('readlogUser', JSON.stringify(loggedUser))
    } catch {
      notify('Invalid username or password', 'error')
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('readlogUser')
    queryClient.clear()
  }

  const requireUser = (component) => (
    user ? component : <Navigate to="/login" replace />
  )

  return (
    <>
      <Notification />

      <Routes>
        <Route element={<Layout user={user} logout={logout} />}>
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={requireUser(
              <BlogList
                blogs={blogs.data || []}
                onCreate={(blog) => createMutation.mutate(blog)}
              />,
            )}
          />
          <Route path="/blogs/:id" element={requireUser(<BlogDetail user={user} />)} />
          <Route path="/users" element={requireUser(<Users />)} />
          <Route path="/users/:id" element={requireUser(<UserDetail />)} />
          <Route path="/labs/*" element={requireUser(<Labs />)} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  )
}
