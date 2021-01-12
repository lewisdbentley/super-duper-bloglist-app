import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('blog', () => {
  let component
  const blog = {
    title: 'ben',
    author: 'jamin',
    url: 'www.frank.com',
    likes: 2
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      < Blog blog={blog} submitLike={mockHandler}/>
    )
  })

  test('renders blogs title and author', () => {
    const content = component.getByText('ben')
    const author = component.getByText('jamin')

    expect(content).toBeDefined()
    expect(author).toBeDefined()
  })

  test('hides url and likes at start', () => {
    const div = component.container.querySelector('.blogFullDisplay')
    expect(div).toHaveStyle('display: none')
  })

  test('shows url and likes after button clicked', () => {
    const button = component.getByText('show')

    fireEvent.click(button)

    const div = component.container.querySelector('.blogFullDisplay')

    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.frank.com')
    expect(div).toHaveTextContent('2')
  })

  test('registers likes button clicked multiple times', () => {

    const button = component.getByText('like')

    fireEvent.click(button) && fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})