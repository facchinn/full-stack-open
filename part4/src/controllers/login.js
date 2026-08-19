import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { SECRET } from '../utils/config.js'

const router = express.Router()

router.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })
  const passwordCorrect = user && await bcrypt.compare(password || '', user.passwordHash)
  if (!passwordCorrect) return response.status(401).json({ error: 'invalid username or password' })

  const token = jwt.sign({ username: user.username, id: user._id }, SECRET, { expiresIn: '7d' })
  response.json({ token, username: user.username, name: user.name, id: user.id })
})

export default router
