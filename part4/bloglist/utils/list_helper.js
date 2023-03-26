const seed_data = require("../utils/seed_data");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, currentBlog) => sum + currentBlog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let currMaxLikes = 0,
    currIndex = 0;

  blogs.forEach((blog, index) => {
    if (blog.likes > currMaxLikes) {
      currMaxLikes = blog.likes;
      currIndex = index;
    }
  });

  return {
    title: blogs[currIndex].title,
    author: blogs[currIndex].author,
    likes: blogs[currIndex].likes,
  };
};

const mostBlogs = (blogs) => {
  const authors_map = new Map();
  for (let i = 0; i < blogs.length; i++) {
    const authors_blogs = authors_map.get(blogs[i].author);
    authors_map.set(blogs[i].author, authors_blogs ? authors_blogs + 1 : 1);
  }

  const { key, value } = getMaxValue(authors_map);
  return {
    author: key,
    blogs: value,
  };
};

const mostLikes = (blogs) => {
  const authors_map = new Map();
  for (let i = 0; i < blogs.length; i++) {
    const authors_likes = authors_map.get(blogs[i].author);
    authors_map.set(
      blogs[i].author,
      authors_likes ? authors_likes + blogs[i].likes : blogs[i].likes
    );
  }

  const { key, value } = getMaxValue(authors_map);
  return {
    author: key,
    likes: value,
  };
};

const getMaxValue = (map) => {
  let maxValue = -1, maxKey = "";
  map.forEach((value, key) => {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  });
  return {
    key: maxKey,
    value: maxValue,
  };
};

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
  mostBlogs,
  mostLikes,
};
