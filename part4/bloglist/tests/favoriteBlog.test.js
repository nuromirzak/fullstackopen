const listHelper = require("../utils/list_helper");
const blogs = require("../utils/seed_data").blogs;

describe("favorite blog", () => {
  test("finding the blog with most likes", () => {
    const result = listHelper.favoriteBlog(blogs);

    const expected = {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,
    };

    expect(result).toEqual(expected);
  });
});
