/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('blogform', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<BlogForm createBlog={mockHandler} />)
  })

  fit('calls submit fn with correct title value', () => {
    const form = component.container.querySelector('.blogForm')
    const title = component.container.querySelector('#title')

    fireEvent.change(title, {
      target: { value: 'a new blog title created by jest' },
    })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe(
      'a new blog title created by jest'
    )
  })
})
