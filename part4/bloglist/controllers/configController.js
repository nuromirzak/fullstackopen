const configRouter = require("express").Router();
const test_helper = require("../tests/test_helpers");

configRouter.get("/init", async (request, response) => {
  await test_helper.initEntireDB();
  response.send("Successfully initialized database");
});

configRouter.get("/delete", async (request, response) => {
  await test_helper.deleteDB();
  response.send("Successfully deleted database");
});

module.exports = configRouter;
