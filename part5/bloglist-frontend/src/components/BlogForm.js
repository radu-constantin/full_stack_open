import { useState } from "react";
import blogService from '../services/blogs';

function BlogForm({ updateBlogList, setShowNotification, clearNotification }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url });
      setTitle('');
      setAuthor('');
      setUrl('');
      updateBlogList(newBlog);
      setShowNotification({type: 'success', message: `"${newBlog.title}" was successfuly added`})
      clearNotification();
    }
    catch(error) {
      setShowNotification({type: 'failure', message: `${error.response.data.error}`})
      clearNotification();
    }
  }

  return (
    <>
      <h3>Create a new blog</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='title'>Title</label>
          <input name='title' value={title} id='title' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <label htmlFor='author'>Author</label>
          <input name='author' value={author} id='author' onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <label htmlFor='url'>URL</label>
          <input name='url' value={url} id='url' onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default BlogForm;