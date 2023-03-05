const Blog = require("../models/blog");
const testHelper = require("./test_helper");
const supertest = require("supertest");
const app = require('../app');
const api = supertest(app);

const initialBlogs = testHelper.initialBlogs;

beforeEach(async () => {
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

  test('can update db with a new blog', async () => {
    const testBlog = {
      title: "Test blog",
      author: "Tester",
      url: "https://test-blog.com",
      likes: 12
    };

    await api.post("/api/blogs").send(testBlog);
    const newBlogList = (await api.get("/api/blogs")).body;

    expect(newBlogList).toHaveLength(initialBlogs.length + 1);
    expect(newBlogList[newBlogList.length - 1]).toMatchObject(testBlog);
  });

  test("if likes property is missing from the request, it defaults to 0", async () => {
    const testBlog = {
      title: "Test blog",
      author: "Tester",
      url: "https://test-blog.com",
    };

    await api.post("/api/blogs").send(testBlog);
    const newBlogList = (await api.get("/api/blogs")).body;

    const newBlog = newBlogList[newBlogList.length - 1];

    expect(newBlog.likes).toBe(0);
  });

  test("if title or url are missing from the request data, respond with status 400", async () => {
    const testBlog = {
      author: "Tester",
      url: "https://test-blog.com",
    };

    const response = await api.post("/api/blogs").send(testBlog);

    expect(response.status).toEqual(400);
  });
});