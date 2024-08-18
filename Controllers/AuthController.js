const DateService = require("../Services/DateService.js");
const TokenService = require("../Services/TokenService.js");
const UserService = require("../Services/UserService.js");
const PasswordService = require("../Services/PasswordService.js");
const ErrorService = require("../Services/ErrorService.js");

class AuthController {

    static async Registate(req, res, next) {
        try {
            //BODY
            const { username, email, password } = req.body;

            //FIND CANDIDATE
            const candidate = await UserService.Get(`username='${username}' or email='${email}'`);
            if (candidate.rows.length) return ErrorService.ThrowBadRequest("User already exists!");

            //CREATE NEW USER
            const userObj = await UserService.Create(username, email, password);
            const passwordObj = await PasswordService.Create(password, userObj.id);

            //RESPONSE
            res.json({ user: userObj, password: passwordObj });
        }
        catch (error) {
            next(error)
        }
    }
    static async Login(req, res, next) {
        try {
            res.json({ validate: req.validatePassword });
            //res.cookie("refreshToken", refreshToken.value, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly });
        }
        catch (error) {
            next(error)
        }
    }
    static async Logout(req, res, next) {
        try {

        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController;