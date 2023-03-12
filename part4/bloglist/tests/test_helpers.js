const Blog = require("../models/blog");
const User = require("../models/user");
const { users, blogs } = require("../utils/seed_data");

async function getLengthOfBlogs() {
  return await Blog.countDocuments({});
}

async function initBlogs() {
  await Blog.deleteMany({});

  for (let blog of blogs) {
    let blogObject = new Blog(blog);

    await blogObject.save();
  }
}

async function getLengthOfUsers() {
  return await User.countDocuments({});
}

async function initUsers() {
  await User.deleteMany({});

  for (let user of users) {
    let blogsOfUser = blogs.filter((blog) => blog.user === user._id);
    user.blogs = blogsOfUser.map((blog) => blog._id);

    let userObject = new User(user);

    await userObject.save();
  }
}

async function initEntireDB() {
  await initBlogs();
  await initUsers();
}

async function deleteDB() {
  await Blog.deleteMany({});
  await User.deleteMany({});
}

module.exports = {
  getLengthOfBlogs,
  getLengthOfUsers,
  initEntireDB,
  deleteDB,
};
