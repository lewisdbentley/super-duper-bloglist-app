import React, { useState } from 'react'


const BlogForm = ({ createBlog }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const postBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={ postBlog } className="blogForm">
                title
        <input
          id="title"
          type="text"
          name="title"
          value= { title }
          onChange={( { target } ) => setTitle(target.value)}
        />
                author
        <input
          id="author"
          type="text"
          name="author"
          value= { author }
          onChange={( { target } ) => setAuthor(target.value)}
        />
                url
        <input
          id="url"
          type="text"
          name="url"
          value= { url }
          onChange={( { target } ) => setUrl(target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm