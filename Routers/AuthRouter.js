const Router = require("express").Router();
const AuthController = require("../Controllers/AuthController.js");

Router.post("/registrate", AuthController.Registate);
Router.post("/login", AuthController.Login);
Router.post("/logout", () => { });

Router.get("/user", AuthController.Get);
Router.delete("/delete", AuthController.Delete);
Router.put("/update", AuthController.Update);

module.exports = Router;