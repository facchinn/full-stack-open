import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../src/components/BlogForm'

test('submits title, author and URL', async () => {
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} />)
  await userEvent.type(screen.getByLabelText('title'), 'A useful post')
  await userEvent.type(screen.getByLabelText('author'), 'Grace')
  await userEvent.type(screen.getByLabelText('url'), 'https://example.com/useful')
  await userEvent.click(screen.getByText('Create'))
  expect(createBlog).toHaveBeenCalledWith({ title: 'A useful post', author: 'Grace', url: 'https://example.com/useful' })
})
