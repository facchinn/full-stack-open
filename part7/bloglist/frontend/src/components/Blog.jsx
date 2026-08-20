import styled from 'styled-components'
import useField from '../hooks/useField'

const Card = styled.article`
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fafafa;
`

const Title = styled.h2`
  margin-top: 0;
`

const Url = styled.a`
  display: inline-block;
  margin-bottom: 12px;
  word-break: break-all;
`

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin: 14px 0;
`

const Button = styled.button`
  padding: 7px 12px;
  border: 1px solid #999;
  border-radius: 6px;
  cursor: pointer;
`

const RemoveButton = styled(Button)`
  border-color: #b00020;
`

const CommentForm = styled.form`
  display: flex;
  gap: 8px;
  margin: 12px 0 18px;
`

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #bbb;
  border-radius: 6px;
`

const CommentList = styled.ul`
  padding-left: 22px;
`

const Blog = ({ blog, currentUser, handleLike, handleRemove, handleComment }) => {
  const comment = useField('text')
  const { reset: resetComment, ...commentInput } = comment

  const canRemove = Boolean(
    currentUser && blog.user && blog.user.username === currentUser.username
  )

  const submitComment = async event => {
    event.preventDefault()
    if (!comment.value.trim()) return

    const added = await handleComment(blog, comment.value)
    if (added) resetComment()
  }

  return (
    <Card className="blogDetails">
      <Title>
        {blog.title} {blog.author}
      </Title>
      <Url href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </Url>
      <div>likes {blog.likes}</div>
      <div>added by {blog.user?.name || 'unknown'}</div>

      {currentUser && (
        <Actions>
          <Button type="button" onClick={() => handleLike(blog)}>
            like
          </Button>
          {canRemove && (
            <RemoveButton type="button" onClick={() => handleRemove(blog)}>
              remove
            </RemoveButton>
          )}
        </Actions>
      )}

      <h3>comments</h3>
      <CommentForm onSubmit={submitComment}>
        <CommentInput aria-label="comment" {...commentInput} />
        <Button type="submit">add comment</Button>
      </CommentForm>

      {(blog.comments || []).length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <CommentList>
          {blog.comments.map((item, index) => (
            <li key={`${blog.id}-comment-${index}`}>{item}</li>
          ))}
        </CommentList>
      )}
    </Card>
  )
}

export default Blog
