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
            const user = UserService.Create("doesnt1matter", "sexy", "1doesnt.matter1@mail.ru", "8(969)-284-55-96");
            res.json(user);
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
