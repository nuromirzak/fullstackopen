const User = require("../models/user");
const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const { saltRounds } = require("../utils/config");
const default_users = require("../tests/default_users");

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: "password must be at least 3 characters long",
    });
  }

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.get("/init", async (request, response) => {
    await User.deleteMany({});

    const users = default_users.map((user) => new User(user));

    for (let user of users) {
      await user.save();
    }

    response.send("Users initialized");
});

module.exports = userRouter;