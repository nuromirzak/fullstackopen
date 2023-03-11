const mongoose = require("mongoose");
const default_users = require("../tests/default_users");
const jwt = require("jsonwebtoken");
const config = require("./config");

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const randomObjectId = () => {
  return new mongoose.Types.ObjectId();
};

const getValidToken = () => {
  const userForToken = {
    username: default_users[0].username,
    id: default_users[0]._id,
  };

  return jwt.sign(userForToken, config.JWT_SECRET);
};

module.exports = {
  isValidObjectId,
  randomObjectId,
  getValidToken,
};
