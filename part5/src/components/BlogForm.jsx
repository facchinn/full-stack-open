import { useState } from 'react'

export default function BlogForm({ createBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const submit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle(''); setAuthor(''); setUrl('')
  }
  return (
    <form className="blog-form" onSubmit={submit}>
      <h2>Add to your reading list</h2>
      <label>Title<input aria-label="title" required value={title} onChange={(event) => setTitle(event.target.value)} /></label>
      <label>Author<input aria-label="author" required value={author} onChange={(event) => setAuthor(event.target.value)} /></label>
      <label>URL<input aria-label="url" type="url" required value={url} onChange={(event) => setUrl(event.target.value)} /></label>
      <button className="primary" type="submit">Create</button>
    </form>
  )
}
