const moongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const users = require("./default_users");

const api = supertest(app);

const User = require("../models/user");

async function getLengthOfUsers() {
  const response = await api.get("/api/users");

  return response.body.length;
}

async function initDatabase() {
  await User.deleteMany({});

  for (let user of users) {
    let userObject = new User(user);

    await userObject.save();
  }
}

beforeEach(async () => {
  await initDatabase();
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

  const usersAtEnd = await getLengthOfUsers();

  expect(usersAtEnd).toBe(users.length + 1);
});

test("user cannot be registered with existing username", async () => {
  const newUser = {
    username: "torvalds",
    name: "Test User",
    password: "testpassword",
  };

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await getLengthOfUsers();

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

  const usersAtEnd = await getLengthOfUsers();

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

  const usersAtEnd = await getLengthOfUsers();

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

    const usersAtEnd = await getLengthOfUsers();

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

    const usersAtEnd = await getLengthOfUsers();

    expect(usersAtEnd).toBe(users.length);
  });
});

afterAll(async () => {
  await moongoose.connection.close();
});
