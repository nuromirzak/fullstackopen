const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const assert = require("node:assert");
const bcrypt = require("bcrypt");

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

let token = "";

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();

  const response = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" });

  token = response.body.token;

  await Blog.deleteMany({});
  for (let blog of initialBlogs) {
    let blogObject = new Blog({
      ...blog,
      user: user._id,
    });
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
    .set("Authorization", `Bearer ${token}`)
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

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

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
    .set("Authorization", `Bearer ${token}`)
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

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await blogsInDb();

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
});

test("a blog cannot be added without a token", async () => {
  const newBlog = {
    title: "CSS is hard",
    author: "John Doe",
    url: "https://www.example.com",
    likes: 0,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await blogsInDb();

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1);

  const titles = blogsAtEnd.map((r) => r.title);

  assert.ok(!titles.includes(blogToDelete.title));
});

test("a blog cannot be deleted with another user", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.post("/api/users").send({
    username: "another",
    password: "another",
  });

  const response = await api.post("/api/login").send({
    username: "another",
    password: "another",
  });

  const anotherToken = response.body.token;

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${anotherToken}`)
    .expect(401);

  const blogsAtEnd = await blogsInDb();

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
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
