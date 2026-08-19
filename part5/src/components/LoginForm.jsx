import { useState } from 'react'

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const submit = (event) => { event.preventDefault(); onLogin({ username, password }) }
  return (
    <form className="login-card" onSubmit={submit}>
      <p className="kicker">Full Stack Open · 05</p>
      <h1>Stories worth keeping.</h1>
      <p className="intro">A private reading list for links, essays and ideas you want to revisit.</p>
      <label>Username<input aria-label="username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" /></label>
      <label>Password<input aria-label="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label>
      <button className="primary" type="submit">Log in <span>→</span></button>
    </form>
  )
}
