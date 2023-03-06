const express = require('express');
const blogsRouter = express.Router();

const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blogObj = new Blog(request.body);
  if (blogObj.title &&  blogObj.author) {
    const newBlog = await blogObj.save();
    response.status(201).json(newBlog);
  } else {
    response.status(400).end();
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const update = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, update, {new: true});
  response.send(updatedBlog);
});

module.exports = blogsRouter;