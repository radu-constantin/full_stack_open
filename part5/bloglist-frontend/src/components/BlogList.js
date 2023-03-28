import Blog from './Blog';

function sortBlogs(blogA, blogB) {
  console.log(blogA);
  console.log(blogB);
  if (blogA.likes > blogB.likes) {
    return -1;
  } else if (blogA.likes < blogB.likes) {
    return 1;
  } else {
    return 0;
  }
}

function BlogList({ blogs }) {
  const sortedBlogs = blogs.sort(sortBlogs)
  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList;
