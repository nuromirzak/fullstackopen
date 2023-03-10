const moongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const blogs = require("./default_blogs");

const api = supertest(app);

const Blog = require("../models/blog");

async function getLengthOfBlogs() {
  const response = await api.get("/api/blogs");

  return response.body.length;
}

async function initDatabase() {
  await Blog.deleteMany({});

  for (let blog of blogs) {
    let blogObject = new Blog(blog);

    await blogObject.save();
  }
}

beforeEach(async () => {
  await initDatabase();
});

test("blogs' length corresponds to the number of blogs in the database and the blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(blogs.length);
});

test("the unique identifier property of the blog posts is named _id", async () => {
  const response = await api.get("/api/blogs");

  const ids = response.body.map((blog) => blog._id);

  for (let id of ids) {
    expect(id).toBeDefined();
  }
});

test("a new blog properly added to the database", async () => {
  const newBlog = {
    title: "Testing if a new blog is properly added to the database",
    author: "OctoCat",
    url: "https://github.com/octocat",
    likes: 0,
  };

  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.body).toMatchObject(newBlog);

  const afterBlogsLength = await getLengthOfBlogs();

  expect(afterBlogsLength).toBe(blogs.length + 1);
});

afterAll(async () => {
  await moongoose.connection.close();
});
