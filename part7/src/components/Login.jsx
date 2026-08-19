import useField from '../hooks/useField'
export default function Login({ onLogin }) {
  const username = useField('text', { required: true, autoComplete: 'username' })
  const password = useField('password', { required: true, autoComplete: 'current-password' })
  const submit = (event) => { event.preventDefault(); onLogin({ username: username.input.value, password: password.input.value }) }
  return <section className="login"><p className="eyebrow">Your reading index</p><h1>Sign in to<br /><em>Readlog.</em></h1><form onSubmit={submit}><label>Username<input {...username.input} /></label><label>Password<input {...password.input} /></label><button>Continue →</button></form></section>
}
