import express from 'express'
import Blog from '../models/blog.js'
import { userExtractor } from '../utils/middleware.js'

const router = express.Router()

router.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (!blog) return response.status(404).end()
  response.json(blog)
})

router.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes = 0 } = request.body
  if (!title || !url) return response.status(400).json({ error: 'title and url are required' })
  const blog = await new Blog({ title, author, url, likes, user: request.user._id }).save()
  request.user.blogs = request.user.blogs.concat(blog._id)
  await request.user.save()
  await blog.populate('user', { username: 1, name: 1 })
  response.status(201).json(blog)
})

router.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = await Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true, runValidators: true }).populate('user', { username: 1, name: 1 })
  if (!blog) return response.status(404).end()
  response.json(blog)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(204).end()
  if (blog.user.toString() !== request.user._id.toString()) return response.status(403).json({ error: 'only the creator can delete this blog' })
  await Blog.findByIdAndDelete(blog._id)
  request.user.blogs = request.user.blogs.filter((id) => id.toString() !== blog._id.toString())
  await request.user.save()
  response.status(204).end()
})

router.post('/:id/comments', async (request, response) => {
  const content = request.body.content?.trim()
  if (!content) return response.status(400).json({ error: 'comment content is required' })
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).end()
  blog.comments.push({ content })
  await blog.save()
  await blog.populate('user', { username: 1, name: 1 })
  response.status(201).json(blog)
})

export default router
