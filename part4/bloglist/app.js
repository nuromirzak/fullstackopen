const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogController");
const userRouter = require("./controllers/userController");
const mongoose = require("mongoose");
require("express-async-errors");

console.log("connecting to", config.MONGODB_URI);

mongoose.set("debug", true);

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

module.exports = app;
