import { useState } from "react";

import blogService from "../services/blogs";

const blogStyle = {
  border: "1px solid black",
  padding: "5px",
  marginBottom: "10px"
}

const Blog = ({ blog, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  async function updateLikes() {
    const updateLikes = likes + 1;
    await blogService.update({...blog, likes: updateLikes, user: blog.user.id});
    setLikes(updateLikes);
  }

  async function deleteBlog(blogToDelete) {
    if (window.confirm(`Are you sure you want to delete ${blogToDelete.title}`))
    await blogService.remove(blogToDelete.id);
    setBlogs(prevBlogs => {
      return prevBlogs.filter(blog => blog.id !== blogToDelete.id);
    })
  }

  const condensedBlog = (
    <div >
      {blog.title} {blog.author}<button onClick={() => setShowDetails(true)}>view</button>
    </div>
  )

  const expandedBlog = (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author} <button onClick={() => setShowDetails(false)}>hide</button></div>
      <div>{blog.url}</div>
      <div>likes {likes}<button onClick={() => updateLikes()}>like</button></div>
      {JSON.parse(window.localStorage.getItem('loggedUser')).username === blog.user.username && <button onClick={() => deleteBlog(blog)}>remove</button>}
    </div>
  )

  let loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
  console.log(`Local storage: ${loggedUser.username}`);
  console.log(blog.user.username);

  return (
    showDetails ? expandedBlog : condensedBlog
  )
}

export default Blog;