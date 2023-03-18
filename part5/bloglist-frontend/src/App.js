import { useState, useEffect } from 'react'
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

import blogService from './services/blogs';

/*
  Implement login funcitonality with localstate
- when user logs in store the token and username in the browser's local state.
- implement a way to log out.
*/


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, [])

  function handleLogout(event) {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  }

  return (
    <>
      {user ?
        <>
          <h3>{user.name} is logged in</h3>
          <button onClick={handleLogout}>Logout</button>
          <BlogList blogs={blogs} username={user.name} />
        </> :
        <LoginForm setUser={setUser} />
      }
    </>
  )
}

export default App