const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  const startTime = Date.now();
  await Blog.deleteMany({});
  await User.deleteMany({});
  const endTime = Date.now();;
  console.log("Reset duration (ms):", endTime - startTime);

  response.status(204).end();
});

module.exports = router;
