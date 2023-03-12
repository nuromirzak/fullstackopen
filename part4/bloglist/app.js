const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
// ! Import express-async-errors before other routes
require("express-async-errors");
const blogRouter = require("./controllers/blogController");
const userRouter = require("./controllers/userController");
const loginRouter = require("./controllers/loginController");
const configRouter = require("./controllers/configController");
const { connect_to_mongodb } = require("./utils/mongodb");
const middleware = require("./utils/middleware");

connect_to_mongodb();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/config", configRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
