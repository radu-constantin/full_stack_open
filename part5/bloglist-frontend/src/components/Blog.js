import { useState } from "react";

import blogService from "../services/blogs";

const blogStyle = {
  border: "1px solid black",
  padding: "5px",
  marginBottom: "10px"
}

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  async function updateLikes() {
    const updateLikes = likes + 1;
    await blogService.update({...blog, likes: updateLikes, user: blog.user.id});
    setLikes(updateLikes);
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
    </div>
  )

  return (
    showDetails ? expandedBlog : condensedBlog
  )
}

export default Blog;