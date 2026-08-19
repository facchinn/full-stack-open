export const dummy = () => 1

export const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

export const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const favorite = blogs.reduce((best, blog) => blog.likes > best.likes ? blog : best)
  return { title: favorite.title, author: favorite.author, likes: favorite.likes }
}

const authorsWith = (blogs, value) => Object.values(blogs.reduce((authors, blog) => {
  const current = authors[blog.author] || { author: blog.author, blogs: 0, likes: 0 }
  current.blogs += 1
  current.likes += blog.likes
  authors[blog.author] = current
  return authors
}, {})).map(({ author, blogs, likes }) => ({ author, [value]: value === 'blogs' ? blogs : likes }))

export const mostBlogs = (blogs) => authorsWith(blogs, 'blogs').reduce((best, author) => !best || author.blogs > best.blogs ? author : best, null)
export const mostLikes = (blogs) => authorsWith(blogs, 'likes').reduce((best, author) => !best || author.likes > best.likes ? author : best, null)
