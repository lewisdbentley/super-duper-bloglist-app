import axios from 'axios'
let baseUrl = '/api/login'

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:5000/api/login'
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
