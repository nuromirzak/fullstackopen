require("dotenv").config();

const port = process.env.PORT;
const mongoUrl =
  process.env.NODE_ENV === "test"
    ? "mongodb://nur_user:nur_password@localhost:27018/nur_db?authSource=admin"
    : process.env.MONGODB_URI;

module.exports = {
  mongoUrl,
  port,
};
