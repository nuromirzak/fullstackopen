const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const mongo_helper = require("../utils/mongo_helper");

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

module.exports = blogRouter;
