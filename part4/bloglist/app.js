const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

mongoose.set("strictQuery", true);

logger.info("Connecting to", config.mongoUrl);

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
