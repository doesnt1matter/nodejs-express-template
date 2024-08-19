const Router = require("express").Router();
const AuthController = require("../Controllers/AuthController.js");

const InitUser = require("../Middlewares/InitUserMiddleware.js")
const ValidatePassword = require("../Middlewares/ValidatePasswordMiddleware.js");
const CheckAuth = require("../Middlewares/CheckAuthMiddleware.js");

Router.post("/registrate", AuthController.Registate);
Router.post("/login", InitUser, ValidatePassword, AuthController.Login);
Router.post("/logout", InitUser, AuthController.Logout);
Router.post("/refresh", AuthController.Refresh);

module.exports = Router;