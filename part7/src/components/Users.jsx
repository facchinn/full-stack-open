import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/api'

export function Users() {
  const { data = [], isLoading } = useQuery({ queryKey: ['users'], queryFn: getUsers })
  if (isLoading) return <p>Loading…</p>
  return <section><header className="page-heading"><div><p className="eyebrow">Community</p><h1>People &<br /><em>their lists.</em></h1></div></header><div className="people-grid">{data.map((user) => <Link to={`/users/${user.id}`} key={user.id}><span>{(user.name || user.username).charAt(0)}</span><h2>{user.name || user.username}</h2><p>@{user.username}</p><strong>{user.blogs.length} blogs →</strong></Link>)}</div></section>
}

export function UserDetail() {
  const { id } = useParams()
  const { data = [] } = useQuery({ queryKey: ['users'], queryFn: getUsers })
  const user = data.find((item) => item.id === id)
  if (!user) return <p>Loading user…</p>
  return <section className="user-detail"><Link className="back" to="/users">← All people</Link><p className="eyebrow">@{user.username}</p><h1>{user.name || user.username}</h1><h2>Added blogs</h2><ul>{user.blogs.map((blog) => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}<span>{blog.likes} likes →</span></Link></li>)}</ul></section>
}
