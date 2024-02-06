const Router = require("express").Router();
const SystemController = require("../Controllers/SystemController.js");

Router.get("/sys", SystemController.GetSystem);
Router.get("/if", SystemController.GetInterfaces);
Router.get("/load", SystemController.GetLoad);

module.exports = Router;
