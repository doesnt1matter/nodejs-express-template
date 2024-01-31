const UserService = require("../Services/UserService.js");

class AuthController {
    
    static Get(req, res, next) {
        try {
            res.json(req.params.id);
        }
        catch (error) {
            next(error)
        }
    }
    static Registate(req, res, next) {
        try {
        }
        catch (error) {
            next(error)
        }
    }
    static Login(req, res, next) {
        try {
        }
        catch (error) {
            next(error)
        }
    }
    static Delete(req, res, next) {
        try {
        }
        catch (error) {
            next(error)
        }
    }
    static UpdateUser(req, res, next) {
        try {
        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController;
