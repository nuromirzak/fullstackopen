const moongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const users = require("./default_users");
const test_helpers = require("./test_helpers");

const api = supertest(app);

beforeEach(async () => {
  await test_helpers.initEntireDB();
});

test("user can be registered", async () => {
  const newUser = {
    username: "testuser",
    name: "Test User",
    password: "testpassword",
  };

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body.username).toBe(newUser.username);
  expect(response.body.name).toBe(newUser.name);
  expect(response.body.passwordHash).not.toBeDefined();

  const usersAtEnd = await test_helpers.getLengthOfUsers();

  expect(usersAtEnd).toBe(users.length + 1);
});

test("user cannot be registered with existing username", async () => {
  const newUser = {
    username: users[0].username,
    name: "Test User",
    password: "testpassword",
  };

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await test_helpers.getLengthOfUsers();

  expect(usersAtEnd).toBe(users.length);
});

test("user cannot be registered with username less than 3 characters", async () => {
  const newUser = {
    username: "to",
    name: "Test User",
    password: "testpassword",
  };

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await test_helpers.getLengthOfUsers();

  expect(usersAtEnd).toBe(users.length);
});

test("user cannot be registered with password less than 3 characters", async () => {
  const newUser = {
    username: "testuser",
    name: "Test User",
    password: "te",
  };

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await test_helpers.getLengthOfUsers();

  expect(usersAtEnd).toBe(users.length);
});

describe("username and password are required", () => {
  test("username is required", async () => {
    const newUser = {
      name: "Test User",
      password: "testpassword",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await test_helpers.getLengthOfUsers();

    expect(usersAtEnd).toBe(users.length);
  });

  test("password is required", async () => {
    const newUser = {
      username: "testuser",
      name: "Test User",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await test_helpers.getLengthOfUsers();

    expect(usersAtEnd).toBe(users.length);
  });
});

afterAll(async () => {
  await moongoose.connection.close();
});
