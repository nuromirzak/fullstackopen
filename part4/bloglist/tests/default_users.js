const bcrypt = require("bcrypt");
const { saltRounds } = require("../utils/config");

const users = [
  {
    username: "torvalds",
    name: "Linus Torvalds",
    passwordHash: bcrypt.hashSync("linux", saltRounds),
  },
  {
    username: "bjarne",
    name: "Bjarne Stroustrup",
    passwordHash: bcrypt.hashSync("c++", saltRounds),
  },
];

module.exports = users;
