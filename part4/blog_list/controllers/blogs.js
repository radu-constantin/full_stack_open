const express = require('express');
const jwt = require('jsonwebtoken');
const blogsRouter = express.Router();

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1});

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  let blogObj = new Blog(request.body);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'});
  }

  const user = await User.findById(decodedToken.id);

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

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'});
  }

  const user = await User.findById(decodedToken.id);
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