const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const mongo_helper = require("../utils/mongo_helper");
const default_blogs = require("../tests/default_blogs");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({
      error: "title or url missing",
    });
  }

  const blog = new Blog(request.body);

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  if (!mongo_helper.isValidObjectId(id)) {
    return response.status(400).json({
      error: "malformatted id",
    });
  }

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "title or url missing",
    });
  }

  const newBlog = await Blog.findOneAndUpdate(
    {
      _id: id,
    },
    body,
    {
      new: true,
    }
  );

  if (!newBlog) {
    return response.status(404).json({
      error: "blog not found",
    });
  }

  response.send(newBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  if (!mongo_helper.isValidObjectId(id)) {
    return response.status(400).json({
      error: "malformatted id",
    });
  }

  const res = await Blog.findByIdAndDelete(id);

  if (!res) {
    return response.status(404).json({
      error: "blog not found",
    });
  }

  response.send(`Deleted blog with id ${id}`);
});

blogRouter.get("/init", async (request, response) => {
  await Blog.deleteMany({});

  for (let blog of default_blogs) {
    const newBlog = new Blog(blog);
    await newBlog.save();
  }

  response.send("Initialized blogs");
});

module.exports = blogRouter;
