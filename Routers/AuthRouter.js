const Router = require("express").Router();
const AuthController = require("../Controllers/AuthController.js");

Router.get("/user/:id", AuthController.Get);
Router.post("/registrate", AuthController.Registate);
Router.post("/login", AuthController.Login);
Router.delete("/delete", AuthController.Delete);
Router.put("/update-user", AuthController.UpdateUser);

module.exports = Router;
