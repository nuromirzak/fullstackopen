const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3003;
const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";

switch (process.env.NODE_ENV) {
  case "test":
    process.env.MONGODB_URI = "mongodb://localhost/bloglist-test";
    break;
  case "production":
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI must be set in production");
    }
    break;
  default:
    process.env.MONGODB_URI = "mongodb://localhost/bloglist";
}

const mongoose_config = {
};

const saltRounds = 10;
    
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT,
  mongoose_config,
  saltRounds,
  JWT_SECRET
};
