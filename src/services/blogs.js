import axios from 'axios'
let baseUrl = '/api/blogs'

let token = null

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:5000/api/blogs'
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  console.log('created a new blog: ', response)
  return response.data
}

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  )
  console.log(response, 'added a like')
  return response
}

const deleteBlog = async (blog) => {
  console.log('deleteBlog id param', blog.id)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAll, create, setToken, update, deleteBlog }
