const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const assert = require("node:assert");

const api = supertest(app);

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "John Doe",
    url: "https://www.example.com",
    likes: 10,
  },
  {
    title: "CSS is easy",
    author: "Jane Doe",
    url: "https://www.example.com",
    likes: 20,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "John Doe",
    url: "https://www.example.com",
    likes: 0,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

beforeEach(async () => {
  await Blog.deleteMany({});
  //   const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  //   const promiseArray = blogObjects.map((blog) => blog.save());
  //   await Promise.all(promiseArray);
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

after(() => {
  mongoose.connection.close();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("the first blog is about HTML", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body[0].title, "HTML is easy");
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "CSS is hard",
    author: "John Doe",
    url: "https://www.example.com",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await blogsInDb();

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

  const titles = blogsAtEnd.map((n) => n.title);

  assert.ok(titles.includes("CSS is hard"));
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "John Doe",
    url: "https://www.example.com",
    likes: 0,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await blogsInDb();

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  console.log(response.body[0]);

  assert.ok(response.body[0].id);
  assert.ifError(response.body[0]._id);
});

test("a blog without likes property defaults to 0", async () => {
  const newBlog = {
    title: "CSS is hard",
    author: "John Doe",
    url: "https://www.example.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await blogsInDb();

  const addedBlog = blogsAtEnd.find((blog) => blog.title === "CSS is hard");

  assert.strictEqual(addedBlog.likes, 0);
});

test("a blog without url is not added", async () => {
  const newBlog = {
    title: "CSS is hard",
    author: "John Doe",
    likes: 0,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await blogsInDb();

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await blogsInDb();

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1);

  const titles = blogsAtEnd.map((r) => r.title);

  assert.ok(!titles.includes(blogToDelete.title));
});

test("a blog can be updated", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const updatedBlog = { ...blogToUpdate, likes: 100 };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await blogsInDb();

  const processedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);

  assert.strictEqual(processedBlog.likes, 100);
});
