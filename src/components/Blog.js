import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ data, setBlogs, blogs }) => {
  const [fullDisplay, setFullDisplay] = useState(false)
  const [blog, setBlog] = useState(data)

  const toggleDisplay = () => setFullDisplay(!fullDisplay)

  const submitLike = async () => {
    const result = await blogService.update({
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author,
      id: blog.id,
    })
    setBlog(result.data)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  let showIfLoggedIn = { display: 'none' }

  let loggedBlogUser

  if (window.localStorage.loggedBlogUser) {
    loggedBlogUser = JSON.parse(window.localStorage.loggedBlogUser)
  }

  if (blog.user && loggedBlogUser) {
    showIfLoggedIn =
      blog.user.username === loggedBlogUser.username
        ? { display: '' }
        : { display: 'none' }
  }

  const showIfFullDisplay = { ...blogStyle, display: fullDisplay ? '' : 'none' }
  const hideIfFullDisplay = { ...blogStyle, display: fullDisplay ? 'none' : '' }

  const deleteBlog = async () => {
    if (window.confirm(`are you sure you want to delete ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog)
        setBlogs(blogs.filter((x) => x.id !== blog.id))
      } catch (exception) {
        console.log(exception, 'happened when deleting ', blog.id)
      }
    }
  }

  return (
    <div className="blogDiv" id="blogDiv">
      <div style={hideIfFullDisplay}>
        {blog.title} - {blog.author} - {blog.likes}
        <button id={`show.${blog.id}`} onClick={toggleDisplay}>
          show
        </button>
      </div>

      <div style={showIfFullDisplay} className="blogFullDisplay">
        <p>
          {blog.title} <button onClick={toggleDisplay}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          <span id="likes">{blog.likes}</span>
          <button onClick={submitLike}>like</button>
        </p>
        <p>{blog.author}</p>
        <div style={showIfLoggedIn}>
          <button onClick={deleteBlog}>delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
