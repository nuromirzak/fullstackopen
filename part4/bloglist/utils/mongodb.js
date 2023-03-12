const mongoose = require("mongoose");
const config = require("./config");

if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
  mongoose.set("debug", true);
}

mongoose.set("strictQuery", true);

const mongoose_config = {};

const connect_to_mongodb = () => {
  console.log("connecting to", config.MONGODB_URI);

  mongoose
    .connect(config.MONGODB_URI, mongoose_config)
    .then(() => {
      console.log("connected to MongoDB");
    })
    .catch((error) => {
      console.log("error connecting to MongoDB:", error);
    });
};

module.exports = { connect_to_mongodb };
