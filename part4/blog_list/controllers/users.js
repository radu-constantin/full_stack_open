const bcrypt = require('bcrypt');
const express = require('express');
const usersRouter = express.Router();
const userHelper = require('../utils/user_helper');

const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1});

  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  const allUsernames = (await User.find({})).map(u => u.username);

  if (!userHelper.validCredentials(username, password)) {
    response.status(400).send({ error: "Username and password must have at least 3 characters!" });
  } else if (allUsernames.includes(username)) {
    response.status(400).send({error: "Username already exists!"});
  }
  else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username, name, passwordHash
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  }
});


module.exports = usersRouter;