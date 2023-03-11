const bcrypt = require("bcrypt");
const { saltRounds } = require("../utils/config");

const users = [
  {
    _id: "640ca8a3d94c03face2359d1",
    username: "unclebob",
    name: "Robert Martin",
    password: "unclebob",
    passwordHash: bcrypt.hashSync("unclebob", saltRounds),
  },
  {
    _id: "640ca89909f8cb8e0bd7a47a",
    username: "calnewport",
    name: "Cal Newport",
    password: "calnewport",
    passwordHash: bcrypt.hashSync("calnewport", saltRounds),
  },
  {
    _id: "640ca8afa84191e856d77125",
    username: "konmari",
    name: "Marie Kondo",
    password: "konmari",
    passwordHash: bcrypt.hashSync("konmari", saltRounds),
  },
  {
    _id: "640caa4f0cd6a7f4115d0176",
    username: "nuromirzak",
    name: "Nurmukhammed Omirzak",
    password: "nuromirzak",
    passwordHash: bcrypt.hashSync("nuromirzak", saltRounds),
  },
];

module.exports = users;
