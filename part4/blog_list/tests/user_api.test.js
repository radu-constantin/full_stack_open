const User = require("../models/user");
const testHelper = require("./test_helper");
const bcrypt = require('bcrypt');
const supertest = require("supertest");
const app = require('../app');
const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('new user can be created', async() => {
    const initialUsers = await User.find({});
    await api.post('/api/users').send({username: 'testUser', password:'test'});
    const users = await User.find({});

    expect(users.length).toEqual(initialUsers.length + 1);
  });
});