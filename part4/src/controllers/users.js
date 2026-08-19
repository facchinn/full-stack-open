import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

const router = express.Router()

router.get('/', async (_request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

router.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password || password.length < 3) return response.status(400).json({ error: 'password must contain at least 3 characters' })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await new User({ username, name, passwordHash }).save()
  response.status(201).json(user)
})

export default router
