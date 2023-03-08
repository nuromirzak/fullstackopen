const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, currentBlog) => sum + currentBlog.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
