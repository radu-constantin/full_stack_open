import PropTypes from 'prop-types';

import Blog from './Blog';

function BlogList({ blogs, setBlogs }) {
  const sortedBlogs = blogs.sort(sortBlogs)

  function sortBlogs(blogA, blogB) {
    if (blogA.likes > blogB.likes) {
      return -1;
    } else if (blogA.likes < blogB.likes) {
      return 1;
    } else {
      return 0;
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default BlogList
