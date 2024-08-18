const Router = require("express").Router();
const UserController = require("../Controllers/UserController.js");

const InitUser = require("../Middlewares/InitUserMiddleware.js")
const ValidatePassword = require("../Middlewares/ValidatePasswordMiddleware.js");

Router.get("/get", InitUser, UserController.Get);
Router.delete("/delete", InitUser, ValidatePassword, UserController.Delete);
Router.put("/update", InitUser, ValidatePassword, UserController.Update);

module.exports = Router;