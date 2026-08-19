import { useState } from 'react'

export default function Blog({ blog, onLike, onRemove, currentUser }) {
  const [visible, setVisible] = useState(false)
  const owner = typeof blog.user === 'object' ? blog.user : null
  const canRemove = !owner || owner.username === currentUser?.username || owner.id === currentUser?.id

  return (
    <article className="blog" data-testid="blog">
      <div className="blog-main">
        <div className="monogram">{blog.author?.charAt(0) || 'B'}</div>
        <div><h2>{blog.title}</h2><p>{blog.author}</p></div>
        <button className="view" onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'View'}</button>
      </div>
      {visible && (
        <div className="blog-details">
          <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
          <div className="like-row"><strong>{blog.likes} likes</strong><button onClick={() => onLike(blog)}>Like</button></div>
          <small>Added by {owner?.name || owner?.username || 'unknown'}</small>
          {canRemove && <button className="remove" onClick={() => onRemove(blog)}>Remove</button>}
        </div>
      )}
    </article>
  )
}
