const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const extractToken = (request) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }

  return null;
};

const tokenExtractor = (request, response, next) => {
  request.token = extractToken(request);
  next();
};

const userExtractor = (request, response, next) => {
  const token = extractToken(request);

  if (!token) {
    return next();
  }

  const decodedToken = jwt.verify(token, config.JWT_SECRET);

  request.user = decodedToken;

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
