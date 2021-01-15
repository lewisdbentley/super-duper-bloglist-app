import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  console.log('inside App')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const blogsSortedByLikes = blogs.sort((a, b) => a.likes - b.likes)

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedBlogUser) {
      const user = JSON.parse(loggedBlogUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      displayMessage(`logged in as ${user.username}`, true)
    } catch (exception) {
      displayMessage('invalid user credentials')
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs([...blogs, createdBlog])
      displayMessage('successfully created a new blog entry', true)
    } catch (exception) {
      displayMessage(exception.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    displayMessage('logged out', false)
  }

  const displayMessage = (message, outcome) => {
    setSuccess(outcome)
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const successMessage = {
    color: '#00FF00',
    padding: '12px',
    backgroundColor: '#f7f7f7',
    border: '12px solid #00FF77',
    borderRadius: '12px',
  }

  const errorMessage = {
    color: '#FF0000',
    padding: '12px',
    backgroundColor: '#f7f7f7',
    border: '12px solid #F00F00',
    borderRadius: '12px',
  }

  const styledMessage = success === true ? successMessage : errorMessage

  const blogFormRef = React.createRef()

  if (!blogs) return null

  return (
    <div>
      {message === '' ? null : <p style={styledMessage}>{message}</p>}

      <h2>Blogs</h2>

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <p>
          {user.username} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      )}

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} displayMessage={displayMessage} />
      </Togglable>

      {blogsSortedByLikes.map((blog) => (
        <Blog key={blog.id} data={blog} setBlogs={setBlogs} blogs={blogs} />
      ))}
    </div>
  )
}

export default App
