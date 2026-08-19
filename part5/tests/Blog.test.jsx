import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

const blog = { id: '1', title: 'Testing React applications', author: 'Ada', url: 'https://example.com', likes: 5, user: { username: 'ada', name: 'Ada' } }

test('shows title and author but hides details initially', () => {
  render(<Blog blog={blog} onLike={() => {}} onRemove={() => {}} currentUser={{ username: 'ada' }} />)
  expect(screen.getByText(blog.title)).toBeVisible()
  expect(screen.getByText(blog.author)).toBeVisible()
  expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
})

test('view button reveals URL and likes', async () => {
  render(<Blog blog={blog} onLike={() => {}} onRemove={() => {}} currentUser={{ username: 'ada' }} />)
  await userEvent.click(screen.getByText('View'))
  expect(screen.getByText(blog.url)).toBeVisible()
  expect(screen.getByText('5 likes')).toBeVisible()
})

test('two clicks call the like handler twice', async () => {
  const onLike = vi.fn()
  render(<Blog blog={blog} onLike={onLike} onRemove={() => {}} currentUser={{ username: 'ada' }} />)
  await userEvent.click(screen.getByText('View'))
  await userEvent.click(screen.getByText('Like'))
  await userEvent.click(screen.getByText('Like'))
  expect(onLike).toHaveBeenCalledTimes(2)
})
