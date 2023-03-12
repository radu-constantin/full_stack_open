const express = require('express');
const blogsRouter = express.Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1});

  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  let blogObj = new Blog(request.body);
  const user = request.user;

  if (blogObj.title &&  blogObj.author) {
    blogObj.user = user.id;
    const savedBlog = await blogObj.save();
    user.blogs = user.blogs.concat(savedBlog._id);

    await user.save();

    response.status(201).json(savedBlog);
  } else {
    response.status(400).end();
  }
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (user.id === blog.user.toString()) {
    blog.deleteOne();
  } else {
    response.status(403).json({error: 'user is not owner of blog'});
  }

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const update = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, update, {new: true});
  response.send(updatedBlog);
});

module.exports = blogsRouter;