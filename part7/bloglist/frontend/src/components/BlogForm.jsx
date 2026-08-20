import styled from 'styled-components'
import useField from '../hooks/useField'

const Form = styled.form`
  max-width: 520px;
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

const Button = styled.button`
  width: fit-content;
  padding: 8px 14px;
  border: 1px solid #999;
  border-radius: 6px;
  cursor: pointer;
`

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const { reset: resetTitle, ...titleInput } = title
  const { reset: resetAuthor, ...authorInput } = author
  const { reset: resetUrl, ...urlInput } = url

  const handleSubmit = async event => {
    event.preventDefault()
    const created = await createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
    })

    if (created) {
      resetTitle()
      resetAuthor()
      resetUrl()
    }
  }

  return (
    <div>
      <h2>create a new blog</h2>
      <Form onSubmit={handleSubmit}>
        <Field>
          title
          <Input name="title" {...titleInput} />
        </Field>
        <Field>
          author
          <Input name="author" {...authorInput} />
        </Field>
        <Field>
          url
          <Input name="url" {...urlInput} />
        </Field>
        <Button type="submit">create</Button>
      </Form>
    </div>
  )
}

export default BlogForm
