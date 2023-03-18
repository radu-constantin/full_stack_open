import { useState, useEffect } from 'react'
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

import blogService from './services/blogs';

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
      blogService.setToken(JSON.parse(loggedUser).token);
    }
  }, [])

  function handleLogout(event) {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  }

  function updateBlogList(newBlog) {
    setBlogs([...blogs, newBlog]);
  }

  return (
    <>
      {user ?
        <>
          <h3>{user.name} is logged in</h3>
          <button onClick={handleLogout}>Logout</button>
          <BlogForm updateBlogList={updateBlogList}/>
          <BlogList blogs={blogs} username={user.name} />
        </> :
        <LoginForm setUser={setUser} />
      }
    </>
  )
}

export default App