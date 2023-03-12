const listHelper = require("../utils/list_helper");
const blogs = require("../utils/seed_data").blogs;

describe("total likes", () => {

  test("of ready-made list is calculated right", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(43);
  });
});
