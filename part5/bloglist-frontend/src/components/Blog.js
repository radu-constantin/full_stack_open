import { useState } from "react";

const blogStyle = {
  border: "1px solid black",
  padding: "5px",
  marginBottom: "10px"
}

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const condensedBlog = (
    <div >
      {blog.title} {blog.author}<button onClick={() => setShowDetails(true)}>view</button>
    </div>
  )

  const expandedBlog = (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author} <button onClick={() => setShowDetails(false)}>hide</button></div>
      <div>{blog.url}</div>
      <div>likes 0 <button>like</button></div>
    </div>
  )

  return (
    showDetails ? expandedBlog : condensedBlog
  )
}

export default Blog