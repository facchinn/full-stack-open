import axios from 'axios'
let token = null
export const setToken = (value) => { token = value ? `Bearer ${value}` : null }
export const getBlogs = () => axios.get('/api/blogs').then((response) => response.data)
export const getBlog = (id) => axios.get(`/api/blogs/${id}`).then((response) => response.data)
export const createBlog = (blog) => axios.post('/api/blogs', blog, { headers: { Authorization: token } }).then((response) => response.data)
export const updateBlog = (blog) => axios.put(`/api/blogs/${blog.id}`, { ...blog, user: blog.user?.id || blog.user }).then((response) => response.data)
export const deleteBlog = (id) => axios.delete(`/api/blogs/${id}`, { headers: { Authorization: token } })
export const commentBlog = ({ id, content }) => axios.post(`/api/blogs/${id}/comments`, { content }).then((response) => response.data)
export const getUsers = () => axios.get('/api/users').then((response) => response.data)
export const login = (credentials) => axios.post('/api/login', credentials).then((response) => response.data)
