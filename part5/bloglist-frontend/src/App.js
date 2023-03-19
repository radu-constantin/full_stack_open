import { useState, useEffect } from 'react'
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification'

import blogService from './services/blogs';

/*
  Implement notifications for: 
  1. succesful login
  2. failed login

  3. succesful blog creationg
  4. failed blog creation
*/

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [showNotification, setShowNotification] = useState(null);

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
  
  function clearNotification() {
    setTimeout(() => {
      setShowNotification(null);
    }, 5000);
  };

  return (
    <>
      {showNotification && <Notification type={showNotification.type} message={showNotification.message}/>}
      {user ?
        <>
          <h3>{user.name} is logged in</h3>
          <button onClick={handleLogout}>Logout</button>
          <BlogForm updateBlogList={updateBlogList} setShowNotification={setShowNotification} clearNotification={clearNotification}/>
          <BlogList blogs={blogs} username={user.name} />
        </> :
        <LoginForm setUser={setUser} setShowNotification={setShowNotification} clearNotification={clearNotification}/>
      }
    </>
  )
}

export default App