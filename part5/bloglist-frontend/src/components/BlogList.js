import Blog from './Blog';

function BlogList({ blogs, username }) {
  return (
    <div>
      <h3>{username} is logged in.</h3>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList;
