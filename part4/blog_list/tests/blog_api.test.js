const Blog = require("../models/blog");
const User = require("../models/user");
const testHelper = require("./test_helper");
const supertest = require("supertest");
const app = require('../app');
const api = supertest(app);
const jwt = require('jsonwebtoken');

const initialBlogs = testHelper.initialBlogs;
let loggedUser;
let userToken;

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of initialBlogs) {
    const blogObj = new Blog(blog);
    await blogObj.save();
  }

  await User.deleteMany({});
  const user = await testHelper.createTestUser();
  loggedUser = await testHelper.loginUser(user);
  userToken = loggedUser.token;
});

describe('Retrieving blogs', () => {
  test('all blogs are received', async () => {
    const response = await api.get("/api/blogs");
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('blogs have id property', async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;

    blogs.forEach(blog => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('Creating blogs', () => {
  test('can update db with a new blog', async () => {
    const testBlog = {
      title: "Test blog",
      author: "Tester",
      url: "https://test-blog.com",
      likes: 12
    };

    await api.post("/api/blogs").send(testBlog).set({Authorization: `Bearer ${userToken}`});
    const newBlogList = (await api.get("/api/blogs")).body;

    expect(newBlogList).toHaveLength(initialBlogs.length + 1);
    expect(newBlogList[newBlogList.length - 1]).toMatchObject(testBlog);
  });

  test('fails with status 401 if token is is not provided', async () => {
    const testBlog = {
      title: "Test blog",
      author: "Tester",
      url: "https://test-blog.com",
      likes: 12
    };

    const response = await api.post("/api/blogs").send(testBlog);
    expect(response.status).toBe(401);
  });

  test("if likes property is missing from the request, it defaults to 0", async () => {
    const testBlog = {
      title: "Test blog",
      author: "Tester",
      url: "https://test-blog.com",
    };

    await api.post("/api/blogs").send(testBlog).set({Authorization: `Bearer ${userToken}`});
    const newBlogList = (await api.get("/api/blogs")).body;

    const newBlog = newBlogList[newBlogList.length - 1];

    expect(newBlog.likes).toBe(0);
  });

  test("if title or url are missing from the request data, respond with status 400", async () => {
    const testBlog = {
      author: "Tester",
      url: "https://test-blog.com",
    };

    const response = await api.post("/api/blogs").send(testBlog).set({Authorization: `Bearer ${userToken}`});
    expect(response.status).toEqual(400);
  });
});

describe("Deleting blogs", () => {
  test("status of 204 is returned when deleting a blog", async () => {
    const testBlog = {
      title: "Test blog",
      author: "Tester",
      url: "https://test-blog.com",
      likes: 12
    };

    const newBlog = (await api.post("/api/blogs").send(testBlog).set({Authorization: `Bearer ${userToken}`})).body;
    const oldBlogs = (await api.get('/api/blogs')).body;

    const response = await api.delete(`/api/blogs/${newBlog.id}`).set({Authorization: `Bearer ${userToken}`});
    expect(response.status).toBe(204);

    const newBlogs = (await api.get('/api/blogs')).body;
    expect(newBlogs).toHaveLength(oldBlogs.length - 1);
  });
});

describe("Updating blogs", () => {
  test("return updated blog post with status 200", async () => {
    const initialBlogs = (await api.get('/api/blogs')).body;

    const response = await api.put(`/api/blogs/${initialBlogs[0].id}`).send({likes: 100});
    expect(response.status).toBe(200);

    const newBlogs = (await api.get('/api/blogs')).body;
    expect(newBlogs[0].likes).toBe(100);
  });
});

