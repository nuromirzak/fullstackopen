const moongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const blogs = require("./default_blogs");
const mongo_helper = require("../utils/mongo_helper");
const test_helpers = require("./test_helpers");

const api = supertest(app);

beforeEach(async () => {
  await test_helpers.initEntireDB();
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

  const token = mongo_helper.getValidToken();

  const response = await api.post("/api/blogs").send(newBlog).set("Authorization", `bearer ${token}`);

  expect(response.body).toMatchObject(newBlog);

  const afterBlogsLength = await test_helpers.getLengthOfBlogs();

  expect(afterBlogsLength).toBe(blogs.length + 1);
});

test("if the likes property is not present in the request, it will have the value 0 by default", async () => {
  const newBlog = {
    title: "Testing if the likes property is set to 0 by default",
    author: "OctoCat",
    url: "https://github.com/octocat",
  };

  const token = mongo_helper.getValidToken();

  const response = await api.post("/api/blogs").send(newBlog).set("Authorization", `bearer ${token}`);

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

describe("testing deleting functionality", () => {
  test("delete a blog with a valid id", async () => {
    const blogsBefore = await api.get("/api/blogs");

    const blogToDelete = blogsBefore.body[0];

    const token = mongo_helper.getValidToken();

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect(`Deleted blog with id ${blogToDelete._id}`);

    const blogsAfter = await api.get("/api/blogs");

    expect(blogsAfter.body).toHaveLength(blogsBefore.body.length - 1);
  });

  test("delete a blog with an invalid id", async () => {
    const blogsBefore = await api.get("/api/blogs");

    const malformattedId = "it_is_not_a_valid_id";

    const token = mongo_helper.getValidToken();

    await api
      .delete(`/api/blogs/${malformattedId}`)
      .set("Authorization", `bearer ${token}`)
      .expect(400)
      .expect({ error: "malformatted id" });

    const blogsAfter = await api.get("/api/blogs");

    expect(blogsAfter.body).toHaveLength(blogsBefore.body.length);
  });

  test("delete a blog with a valid id but not present in the database", async () => {
    const blogsBefore = await api.get("/api/blogs");

    const id = mongo_helper.randomObjectId();

    const token = mongo_helper.getValidToken();

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(404)
      .expect({ error: "blog not found" });

    const blogsAfter = await api.get("/api/blogs");

    expect(blogsAfter.body).toHaveLength(blogsBefore.body.length);
  });
});

describe("testing updating functionality", () => {
  test("update a blog with a valid id", async () => {
    const blogsBefore = await api.get("/api/blogs");

    const blogToUpdate = blogsBefore.body[0];

    const updatedBlog = {
      title: blogToUpdate.title + " (updated)",
      url: blogToUpdate.url,
      author: blogToUpdate.author,
      likes: Math.floor(Math.random() * 100),
    };

    await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAfter = await api.get("/api/blogs");

    expect(blogsAfter.body).toHaveLength(blogsBefore.body.length);

    const updatedBlogFromDatabase = blogsAfter.body.find(
      (blog) => blog._id === blogToUpdate._id
    );

    expect(updatedBlogFromDatabase).toMatchObject(updatedBlog);
  });

  describe("update a blog with missing title and url", () => {
    test("missing title", async () => {
      const blogsBefore = await api.get("/api/blogs");

      const blogToUpdate = blogsBefore.body[0];

      const updatedBlog = {
        url: blogToUpdate.url + " (updated)",
        author: blogToUpdate.author,
        likes: Math.floor(Math.random() * 100),
      };
    });

    test("missing url", async () => {
      const blogsBefore = await api.get("/api/blogs");

      const blogToUpdate = blogsBefore.body[0];

      const updatedBlog = {
        title: blogToUpdate.title + " (updated)",
        author: blogToUpdate.author,
        likes: Math.floor(Math.random() * 100),
      };

      await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .send(updatedBlog)
        .expect(400);

      const blogsAfter = await api.get("/api/blogs");

      expect(blogsAfter.body).toHaveLength(blogsBefore.body.length);

      const updatedBlogFromDatabase = blogsAfter.body.find(
        (blog) => blog._id === blogToUpdate._id
      );

      expect(updatedBlogFromDatabase).toMatchObject(blogToUpdate);
    });
  });

  test("update a blog with a valid id but not present in the database", async () => {
    const blogsBefore = await api.get("/api/blogs");

    const id = mongo_helper.randomObjectId();

    const updatedBlog = {
      title:
        "Testing if a blog can be updated with a valid id but not present in the database",
      author: "OctoCat",
      url: "https://github.com/octocat",
      likes: 0,
    };

    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(404)
      .expect({ error: "blog not found" });

    const blogsAfter = await api.get("/api/blogs");

    expect(blogsAfter.body).toHaveLength(blogsBefore.body.length);

    const updatedBlogFromDatabase = blogsAfter.body.find(
      (blog) => blog._id === id
    );

    expect(updatedBlogFromDatabase).toBeUndefined();
  });

  test("update a blog with an invalid id", async () => {
    const blogsBefore = await api.get("/api/blogs");

    const malformattedId = "it_is_not_a_valid_id";

    const updatedBlog = {
      title: "Testing if a blog can be updated with an invalid id",
      author: "OctoCat",
      url: "https://github.com/octocat",
      likes: 0,
    };

    await api
      .put(`/api/blogs/${malformattedId}`)
      .send(updatedBlog)
      .expect(400)
      .expect({ error: "malformatted id" });

    const blogsAfter = await api.get("/api/blogs");

    expect(blogsAfter.body).toHaveLength(blogsBefore.body.length);

    const updatedBlogFromDatabase = blogsAfter.body.find(
      (blog) => blog._id === malformattedId
    );

    expect(updatedBlogFromDatabase).toBeUndefined();
  });
});

afterAll(async () => {
  await moongoose.connection.close();
});
