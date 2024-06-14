const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog), {});
};

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((authors, blog) => {
    authors[blog.author] = authors[blog.author] ? authors[blog.author] + 1 : 1;
    return authors;
  }, {});
  console.log(authors);

  return Object.entries(authors).reduce(
    (max, author) => (max[1] > author[1] ? max : author),
    []
  );
};

const mostLikes = (blogs) => {
  const authors = blogs.reduce((authors, blog) => {
    authors[blog.author] = authors[blog.author]
      ? authors[blog.author] + blog.likes
      : blog.likes;
    return authors;
  }, {});

  return Object.entries(authors).reduce(
    (max, author) => (max[1] > author[1] ? max : author),
    []
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
