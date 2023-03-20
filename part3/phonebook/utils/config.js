const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3001;

switch (process.env.NODE_ENV) {
  case "test":
    process.env.MONGODB_URI = "mongodb://localhost/phonebook-test";
    break;
  case "production":
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI must be set in production");
    }
    break;
  default:
    process.env.MONGODB_URI = "mongodb://localhost/phonebook";
}

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT,
};
