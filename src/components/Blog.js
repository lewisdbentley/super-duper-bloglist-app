import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, submitLike }) => {
  const [ fullDisplay, setFullDisplay ] = useState(false)

  const toggleDisplay = () => setFullDisplay(!fullDisplay)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let showIfLoggedIn = { display: 'none' }

  let loggedBlogUser

  if(window.localStorage.loggedBlogUser) {
    loggedBlogUser = JSON.parse(window.localStorage.loggedBlogUser)
  }

  if(blog.user && loggedBlogUser) {
    showIfLoggedIn = blog.user.username === loggedBlogUser.username
      ? { display: '' }
      : { display: 'none' }
  }

  const showIfFullDisplay = { ...blogStyle, display: fullDisplay ? '' : 'none' }
  const hideIfFullDisplay = { ...blogStyle, display: fullDisplay ? 'none' : '' }




  const deleteBlog = async () => {
    if(window.confirm(`are you sure you want to delete ${blog.title}?`)) {
      try {
        const result = await blogService
          .deleteBlog(blog)
        console.log('result of delete operation: ', result)
      } catch (exception) {
        console.log(exception, 'happened when deleting ', blog.id)
      }
    }
  }

  return (
    <div className='blogDiv'>
      <div style={hideIfFullDisplay}>
        {blog.title} - {blog.author} - {blog.likes}- <button onClick={ toggleDisplay }>show</button>
      </div>

      <div style={showIfFullDisplay} className='blogFullDisplay'>
        <p>{blog.title} <button onClick={ toggleDisplay }>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={ submitLike }>like</button></p>
        <p>{blog.author}</p>
        <div style={showIfLoggedIn}>
          <button onClick={ deleteBlog }>delete</button>
        </div>
      </div>
    </div>
  )}

export default Blog
