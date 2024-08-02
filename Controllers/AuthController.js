const DateService = require("../Services/DateService.js");
const TokenService = require("../Services/TokenService.js");
const UserService = require("../Services/UserService.js");
const PasswordService = require("../Services/PasswordService.js");
const ErrorService = require("../Services/ErrorService.js");

class AuthController {

    static async Get(req, res, next) {
        try {
            //PARAMS
            const id = req.params["id"];

            //GET USER
            const user = await UserService.Get(`id='${id}' or username='${id}' or email='${id}'`);
            res.json({ user: user.rows[0] });
        }
        catch (error) {
            next(error)
        }
    }
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

            //BACKUP
            res.json({ user: userObj, password: passwordObj });
        }
        catch (error) {
            next(error)
        }
    }
    static async Login(req, res, next) {
        try {
            //BODY
            const { username, email, password } = req.body;

            //FIND USER
            const identificator = username ?? email;
            const userObj = await UserService.Get(`username='${identificator}' or email='${identificator}'`);
            if (!userObj.rows.length) return ErrorService.ThrowBadRequest("User doesnt exists!");

            //FIND PASSWORD FOR USER
            const passwordObj = await PasswordService.Get(`user_id='${userObj.rows[0].id}'`);

            //AUTHORIZATION
            const validate = PasswordService.Compare(password, passwordObj.rows[0].value);

            res.json({ validate });
            //res.cookie("refreshToken", refreshToken.value, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly });
        }
        catch (error) {
            next(error)
        }
    }
    static async Delete(req, res, next) {
        try {
        }
        catch (error) {
            next(error)
        }
    }
    static async UpdateUser(req, res, next) {
        try {
        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController;