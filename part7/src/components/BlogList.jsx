import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
export default function BlogList({ blogs, onCreate }) {
  return <section><header className="page-heading"><div><p className="eyebrow">Library index</p><h1>Collected<br /><em>reading.</em></h1></div><p>A considered list of essays, articles and references shared by the community.</p></header><BlogForm onCreate={onCreate} /><div className="table"><div className="table-head"><span>Title</span><span>Author</span><span>Likes</span></div>{[...blogs].sort((a, b) => b.likes - a.likes).map((blog, index) => <Link className="table-row" to={`/blogs/${blog.id}`} key={blog.id}><span><small>{String(index + 1).padStart(2, '0')}</small>{blog.title}</span><span>{blog.author}</span><strong>{blog.likes}</strong></Link>)}</div></section>
}
