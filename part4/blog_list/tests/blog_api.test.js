const Blog = require("../models/blog");
const testHelper = require("./test_helper");
const supertest = require("supertest");
const app = require('../app');
const api = supertest(app);

const initialBlogs = testHelper.initialBlogs;

beforeAll(async () => {
  await Blog.deleteMany({});

  for (const blog of initialBlogs) {
    const blogObj = new Blog(blog);
    await blogObj.save();
  }
});

describe('blog api tests', () => {
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