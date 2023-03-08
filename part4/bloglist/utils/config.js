const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bloglist";

module.exports = {
  MONGODB_URI,
  PORT,
};
