import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => { token = `Bearer ${newToken}` }
const getAll = () => axios.get(baseUrl).then((response) => response.data)
const create = (blog) => axios.post(baseUrl, blog, { headers: { Authorization: token } }).then((response) => response.data)
const update = (blog) => axios.put(`${baseUrl}/${blog.id}`, blog).then((response) => response.data)
const remove = (id) => axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })

export default { setToken, getAll, create, update, remove }
