const express = require("express");
const StationsController = require("./controllers/StationsController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send("Hello World");
});

routes.post("/stations/:idStation", StationsController.post);
routes.get("/stations/:idStation", StationsController.get);

module.exports = routes;
