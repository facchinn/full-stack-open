import { useCallback, useEffect, useState } from 'react'
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import styled from 'styled-components'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import ErrorBoundary from './components/ErrorBoundary'
import Notification from './components/Notification'
import useField from './hooks/useField'
import loginService from './services/login'
import userService from './services/users'
import {
  useAppActions,
  useBlogs,
  useLoggedUser,
  useNotification,
} from './store'

const Page = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  font-family: Arial, sans-serif;
  color: #222;
`

const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 24px;
  background: #eee;
  border-radius: 9px;
`

const NavLink = styled(Link)`
  color: #222;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Button = styled.button`
  padding: 7px 12px;
  border: 1px solid #999;
  border-radius: 6px;
  cursor: pointer;
`

const StyledForm = styled.form`
  max-width: 420px;
  display: grid;
  gap: 12px;
`

const Field = styled.label`
  display: grid;
  gap: 5px;
  font-weight: 600;
`

const Input = styled.input`
  padding: 9px;
  border: 1px solid #bbb;
  border-radius: 6px;
`

const BlogRow = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #e3e3e3;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
`

const Panel = styled.section`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fafafa;
`

const LoginForm = ({ handleLogin }) => {
  const username = useField('text')
  const password = useField('password')
  const { reset: resetUsername, ...usernameInput } = username
  const { reset: resetPassword, ...passwordInput } = password

  const submit = async event => {
    event.preventDefault()
    const loggedIn = await handleLogin(username.value, password.value)

    if (loggedIn) {
      resetUsername()
      resetPassword()
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <StyledForm onSubmit={submit}>
        <Field>
          username
          <Input name="username" {...usernameInput} />
        </Field>
        <Field>
          password
          <Input name="password" {...passwordInput} />
        </Field>
        <Button type="submit">login</Button>
      </StyledForm>
    </div>
  )
}

const BlogList = ({ blogs }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog => (
      <BlogRow className="blog" key={blog.id}>
        <NavLink to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </NavLink>
      </BlogRow>
    ))}
  </div>
)

const UsersView = ({ users }) => (
  <div>
    <h2>users</h2>
    <Table>
      <thead>
        <tr>
          <th>user</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>
              <NavLink to={`/users/${user.id}`}>{user.name || user.username}</NavLink>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

const UserView = ({ users }) => {
  const { id } = useParams()
  const user = users.find(item => item.id === id)

  if (!user) return <div>user not found</div>

  return (
    <Panel>
      <h2>{user.name || user.username}</h2>
      <h3>added blogs</h3>
      {user.blogs.length === 0 ? (
        <p>No blogs added.</p>
      ) : (
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>
              <NavLink to={`/blogs/${blog.id}`}>{blog.title}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}

const BlogRoute = ({ blogs, user, handleLike, handleRemove, handleComment }) => {
  const { id } = useParams()
  const blog = blogs.find(item => item.id === id)

  if (!blog) return <div>blog not found</div>

  return (
    <Blog
      blog={blog}
      currentUser={user}
      handleLike={handleLike}
      handleRemove={handleRemove}
      handleComment={handleComment}
    />
  )
}

const NotFound = () => (
  <Panel>
    <h2>Page not found</h2>
    <p>The address does not match any page in this application.</p>
  </Panel>
)

const App = () => {
  const blogs = useBlogs()
  const user = useLoggedUser()
  const notification = useNotification()
  const {
    initializeBlogs,
    initializeUser,
    notify,
    loginUser,
    logoutUser,
    createBlog,
    likeBlog,
    removeBlog,
    commentBlog,
  } = useAppActions()
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const refreshUsers = useCallback(async () => {
    const data = await userService.getAll()
    setUsers(data)
  }, [])

  useEffect(() => {
    initializeBlogs().catch(() => notify('blogs could not be loaded'))
    initializeUser()
    refreshUsers().catch(() => notify('users could not be loaded'))
  }, [initializeBlogs, initializeUser, notify, refreshUsers])

  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      loginUser(loggedUser)
      notify(`${loggedUser.name} logged in`)
      navigate('/')
      return true
    } catch {
      notify('wrong username or password')
      return false
    }
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  const handleCreate = async blog => {
    try {
      const createdBlog = await createBlog(blog)
      notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      await refreshUsers()
      navigate('/')
      return true
    } catch {
      notify('blog could not be created')
      return false
    }
  }

  const handleLike = async blog => {
    try {
      await likeBlog(blog)
    } catch {
      notify('blog could not be liked')
    }
  }

  const handleRemove = async blog => {
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!confirmed) return

    try {
      await removeBlog(blog)
      await refreshUsers()
      navigate('/')
    } catch {
      notify('blog could not be removed')
    }
  }

  const handleComment = async (blog, comment) => {
    try {
      await commentBlog(blog, comment)
      notify('comment added')
      return true
    } catch {
      notify('comment could not be added')
      return false
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <Page>
      <Navigation>
        <NavLink to="/">blogs</NavLink>
        <NavLink to="/users">users</NavLink>
        {user && <NavLink to="/create">new blog</NavLink>}
        {!user && <NavLink to="/login">login</NavLink>}
        {user && (
          <>
            <span>{user.name} logged in</span>
            <Button type="button" onClick={handleLogout}>
              logout
            </Button>
          </>
        )}
      </Navigation>

      <ErrorBoundary key={location.pathname}>
        <Notification message={notification} />

        <Routes>
          <Route path="/" element={<BlogList blogs={sortedBlogs} />} />
          <Route path="/users" element={<UsersView users={users} />} />
          <Route path="/users/:id" element={<UserView users={users} />} />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" replace /> : <LoginForm handleLogin={handleLogin} />
            }
          />
          <Route
            path="/create"
            element={
              user ? <BlogForm createBlog={handleCreate} /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <BlogRoute
                blogs={blogs}
                user={user}
                handleLike={handleLike}
                handleRemove={handleRemove}
                handleComment={handleComment}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Page>
  )
}

export default App
