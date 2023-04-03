import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import blogService from '../services/blogs'

jest.mock('../services/blogs')

const testBlog = {
  author: 'admin',
  id: '1',
  likes: 0,
  title: 'test',
  'url': 'www.adminblog.com',
  user: {
    id: 1,
    name: 'admin',
    username: 'admin',
  }
}

beforeAll(async () => {
  await window.localStorage.setItem(
    'loggedUser',
    '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2MzIzMDdkZWNkNjBmZTQ4ZjUyMWIwMGYiLCJpYXQiOjE2NjMyNDAxNjV9.vypKPoRhoehrgUdcgYFJluWRHMP5ho44ZhB5GG-5vio","username":"user","name":"admin"}'
  )
})

test('by default a blog renders author and title, but not likes and url ', async () => {
  const { container } = render(<Blog blog={testBlog} />)
  expect(container).toHaveTextContent('test admin')
  expect(container).not.toHaveTextContent('likes www.adminblog.com')
})

test('when view button is clicked, blog URL and number of likes are also shown', async () => {
  render(<Blog blog={testBlog} />)
  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)
  screen.getByText(/likes/)
  screen.getByText(/www.adminblog.com/)
})

test('when like button is clicked twice, the corresponding function is called twice', async () => {
  render(<Blog blog={testBlog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(blogService.update).toBeCalledTimes(2)
})