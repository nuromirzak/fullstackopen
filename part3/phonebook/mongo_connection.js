const moongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");

moongoose.set("strictQuery", true);

moongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
