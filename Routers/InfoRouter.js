const Router = require("express").Router();
const InfoController = require("../Controllers/InfoController.js");

Router.get("/sys", InfoController.GetSystem);
Router.get("/if", InfoController.GetInterfaces);
Router.get("/load", InfoController.GetLoad);

module.exports = Router;
