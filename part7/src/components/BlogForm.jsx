import useField from '../hooks/useField'
export default function BlogForm({ onCreate }) {
  const title = useField('text', { required: true })
  const author = useField('text', { required: true })
  const url = useField('url', { required: true })
  const submit = (event) => { event.preventDefault(); onCreate({ title: title.input.value, author: author.input.value, url: url.input.value }); title.reset(); author.reset(); url.reset() }
  return <form className="create-form" onSubmit={submit}><h2>Add a blog</h2><div><label>Title<input {...title.input} /></label><label>Author<input {...author.input} /></label><label>URL<input {...url.input} /></label></div><button>Add to library</button></form>
}
