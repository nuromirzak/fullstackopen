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

test("if the likes property is not present in the request, it will have the value 0 by default", async () => {
  const newBlog = {
    title: "Testing if the likes property is set to 0 by default",
    author: "OctoCat",
    url: "https://github.com/octocat",
  };

  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.body.likes).toBe(0);
});

describe("if the title or url properties are missing from the request data, return 400 Bad Request", () => {
  test("check with title missing", async () => {
    const newBlog = {
      author: "OctoCat",
      url: "https://github.com/octocat",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("check with url missing", async () => {
    const newBlog = {
      title: "Testinf if the url property is missing",
      author: "OctoCat",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

afterAll(async () => {
  await moongoose.connection.close();
});
