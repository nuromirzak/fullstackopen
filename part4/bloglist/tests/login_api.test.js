const bcrypt = require("bcrypt");
const User = require("../models/user");
const { test, describe, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");

const api = supertest(app);

async function usersInDb() {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
}

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  after(() => {
    mongoose.connection.close();
  });

  test("user can login with correct credentials", async () => {
    const request = {
      username: "root",
      password: "sekret",
    };

    await api
      .post("/api/login")
      .send(request)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("user cannot login with incorrect credentials", async () => {
    const request = {
      username: "root",
      password: "wrong",
    };

    await api
      .post("/api/login")
      .send(request)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
});
