const express = require('express');
const blogsRouter = express.Router();

const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blogObj = new Blog(request.body);
  const newBlog = await blogObj.save();

  response.status(201).json(newBlog);
});

module.exports = blogsRouter;