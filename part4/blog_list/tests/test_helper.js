const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const initialBlogs = [
  {
    title: "Radu's blog",
    author: "Radu",
    url: "https://radu-blog.com",
    likes: 5
  },
  {
    title: "Maria's blog",
    author: "Maria",
    url: "https://maria-blog.com",
    likes: 7
  }
];

async function createTestUser() {
  const passwordHash = await bcrypt.hash('test', 10);
  const user = new User({
    username: 'tester',
    name: 'Test User',
    passwordHash
  });

  await user.save();
  return user;
}

async function loginUser(user) {
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  return {token, username: user.username, name: user.name};
}

module.exports = {
  initialBlogs,
  createTestUser,
  loginUser
};
