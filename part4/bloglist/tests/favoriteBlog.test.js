const listHelper = require("../utils/list_helper");
const blogs = require("./default_blogs");

describe("favorite blog", () => {

  test("finding the blog with most likes", () => {
    const result = listHelper.favoriteBlog(blogs);

    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    expect(result).toEqual(expected);
  });
});
