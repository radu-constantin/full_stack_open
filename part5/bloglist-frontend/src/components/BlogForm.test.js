import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const updateBlogMock = jest.fn()
const showNotificationMock = jest.fn()
const clearNotificationMock = jest.fn()
const toggleVisibilityMock = jest.fn()

jest.mock('../services/blogs')

test('function is called with appropriate details when form is submitted', async () => {
  const user = userEvent.setup()
  render(<BlogForm updateBlogList={updateBlogMock} setShowNotification={showNotificationMock} clearNotification={clearNotificationMock} toggleVisibility={toggleVisibilityMock} />)
  const titleInput = screen.getByLabelText('Title')
  const authorInput = screen.getByLabelText('Author')
  const submitButton = screen.getByText('Submit')

  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')

  await user.click(submitButton)
  expect(blogService.create).toBeCalledWith({ title: 'test title', author: 'test author', url: '' })
})