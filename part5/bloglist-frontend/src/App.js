import { useState, useEffect } from 'react'
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

import blogService from './services/blogs';

/*
  Implement login funcitonality
- token returned from succesful login is saved in the application state(user);
- if user is not logged in, only the login form is visible;
- if user is logged in, the name of the user and a list of blogs is shown.
*/


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <>
      {user ?
        <BlogList blogs={blogs} username={user.name} /> :
        <LoginForm setUser={setUser}/>
        }
    </>
  )
}

export default App