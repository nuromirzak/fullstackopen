const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
// ! Import express-async-errors before other routes
require("express-async-errors");
const blogRouter = require("./controllers/blogController");
const userRouter = require("./controllers/userController");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

console.log("connecting to", config.MONGODB_URI);

if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
  mongoose.set("debug", true);
}

mongoose.set("strictQuery", true);

mongoose
  .connect(config.MONGODB_URI, config.mongoose_config)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(middleware.errorHandler);

module.exports = app;
