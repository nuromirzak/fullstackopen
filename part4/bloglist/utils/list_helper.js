const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, currentBlog) => sum + currentBlog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let currMaxLikes = 0, currIndex = 0;

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

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
};
