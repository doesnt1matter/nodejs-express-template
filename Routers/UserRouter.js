const Router = require("express").Router();
const UserController = require("../Controllers/UserController.js");

const InitUser = require("../Middlewares/InitUserMiddleware.js")
const ValidatePassword = require("../Middlewares/ValidatePasswordMiddleware.js");
const CheckAuth = require("../Middlewares/CheckAuthMiddleware.js");

Router.get("/get", CheckAuth, InitUser, UserController.Get);
Router.delete("/delete", CheckAuth, InitUser, ValidatePassword, UserController.Delete);
Router.put("/update", CheckAuth, InitUser, ValidatePassword, UserController.Update);

module.exports = Router;