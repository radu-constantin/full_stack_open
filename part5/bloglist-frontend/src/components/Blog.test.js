import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Blog from './Blog'

test('by default a blog renders author and title, but not likes and url ', async () => {
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

  await window.localStorage.setItem(
    'loggedUser',
    '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2MzIzMDdkZWNkNjBmZTQ4ZjUyMWIwMGYiLCJpYXQiOjE2NjMyNDAxNjV9.vypKPoRhoehrgUdcgYFJluWRHMP5ho44ZhB5GG-5vio","username":"user","name":"admin"}'
  )

  const { container } = render(<Blog blog={testBlog} />)
  expect(container).toHaveTextContent('test admin')
  expect(container).not.toHaveTextContent('likes www.adminblog.com')
})