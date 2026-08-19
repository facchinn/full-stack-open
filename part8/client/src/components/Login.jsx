import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { PageTitle } from './Authors'
export default function Login({ onLogin, notify }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN, { onCompleted: (data) => onLogin(data.login.value), onError: (error) => notify(error.message, 'error') })
  return <section><PageTitle index="04" title="Login" subtitle="Curate and personalize your library" /><form className="new-book login-form" onSubmit={(event) => { event.preventDefault(); login({ variables: { username, password } }) }}><label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label><button className="submit">Login →</button></form></section>
}
