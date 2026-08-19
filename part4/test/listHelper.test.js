import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { dummy, favoriteBlog, mostBlogs, mostLikes, totalLikes } from '../src/utils/listHelper.js'

const blogs = [
  { title: 'React patterns', author: 'Michael Chan', likes: 7 },
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 },
  { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 },
  { title: 'First class tests', author: 'Robert C. Martin', likes: 10 },
  { title: 'TDD harms architecture', author: 'Robert C. Martin', likes: 0 },
  { title: 'Type wars', author: 'Robert C. Martin', likes: 2 },
]

describe('list helper', () => {
  test('dummy returns one', () => assert.equal(dummy(blogs), 1))
  test('total likes', () => assert.equal(totalLikes(blogs), 36))
  test('favorite blog', () => assert.deepEqual(favoriteBlog(blogs), { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 }))
  test('most blogs', () => assert.deepEqual(mostBlogs(blogs), { author: 'Robert C. Martin', blogs: 3 }))
  test('most likes', () => assert.deepEqual(mostLikes(blogs), { author: 'Edsger W. Dijkstra', likes: 17 }))
})
