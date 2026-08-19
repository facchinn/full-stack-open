import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentBlog, deleteBlog, getBlog, updateBlog } from '../services/api'
import { useNotification } from '../context/NotificationContext'

export default function BlogDetail({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const client = useQueryClient()
  const { notify } = useNotification()
  const result = useQuery({ queryKey: ['blog', id], queryFn: () => getBlog(id) })
  const refresh = (blog) => { client.setQueryData(['blog', id], blog); client.invalidateQueries({ queryKey: ['blogs'] }) }
  const likeMutation = useMutation({ mutationFn: updateBlog, onSuccess: refresh })
  const commentMutation = useMutation({ mutationFn: commentBlog, onSuccess: refresh })
  const deleteMutation = useMutation({ mutationFn: deleteBlog, onSuccess: () => { client.invalidateQueries({ queryKey: ['blogs'] }); notify('Blog removed'); navigate('/') } })

  if (result.isLoading) return <p>Loading…</p>
  if (result.isError) return <p>Blog not found.</p>
  const blog = result.data
  const isOwner = blog.user?.username === user.username || blog.user?.id === user.id
  const addComment = (event) => { event.preventDefault(); const content = event.target.comment.value.trim(); if (content) commentMutation.mutate({ id, content }); event.target.reset() }

  return <article className="detail"><Link className="back" to="/">← All blogs</Link><p className="eyebrow">{blog.author}</p><h1>{blog.title}</h1><a className="external" href={blog.url} target="_blank" rel="noreferrer">Visit original ↗</a><div className="stats"><div><span>Likes</span><strong>{blog.likes}</strong></div><button onClick={() => likeMutation.mutate({ ...blog, likes: blog.likes + 1 })}>Appreciate +</button>{isOwner && <button className="delete" onClick={() => window.confirm(`Delete ${blog.title}?`) && deleteMutation.mutate(blog.id)}>Delete</button>}</div><section className="comments"><h2>Conversation <span>{blog.comments?.length || 0}</span></h2><form onSubmit={addComment}><input name="comment" placeholder="Add a thoughtful comment…" /><button>Post</button></form><ol>{blog.comments?.map((comment) => <li key={comment.id}><span>{comment.content}</span><small>{new Date(comment.createdAt).toLocaleDateString()}</small></li>)}</ol></section></article>
}
