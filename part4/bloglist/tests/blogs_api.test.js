const moongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const blogs = require("./default_blogs");

const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of blogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs' length corresponds to the number of blogs in the database and the blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(blogs.length);
});

afterAll(async () => {
  await moongoose.connection.close();
});
