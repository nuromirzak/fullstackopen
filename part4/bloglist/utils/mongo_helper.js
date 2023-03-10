const mongoose = require("mongoose");

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const randomObjectId = () => {
  return new mongoose.Types.ObjectId();
};

module.exports = {
  isValidObjectId,
  randomObjectId,
};
