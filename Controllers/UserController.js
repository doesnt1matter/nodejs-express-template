const DateService = require("../Services/DateService.js");
const TokenService = require("../Services/JWTService.js");
const UserService = require("../Services/UserService.js");
const PasswordService = require("../Services/PasswordService.js");
const ErrorService = require("../Services/ErrorService.js");

class UserController {
    static async Get(req, res, next) {
        try {
            res.json(req.user);
        }
        catch (error) {
            next(error)
        }
    }
    static async Delete(req, res, next) {
        try {
            await UserService.Delete(req.user.id);

            res.json({ message: "Delete success!" });
        }
        catch (error) {
            next(error)
        }
    }
    static async Update(req, res, next) {
        try {
            const { params } = req.body;

            //FIND PROHIBITION FIELDS
            const permittedfields = ["email", "username"];
            for (const prop in params) if (!permittedfields.includes(prop)) ErrorService.ThrowBadRequest(`Field ${prop} is not permitted to change!`);

            //FIND USERS BY MAIN FIELDS
            if (params.username) {
                const candidate = await UserService.Get(`username='${params.username}'`);
                if (candidate.rows.length) ErrorService.ThrowBadRequest("User already exists!");
            }
            if (params.email) {
                const candidate = await UserService.Get(`email='${params.email}'`);
                if (candidate.rows.length) ErrorService.ThrowBadRequest("User already exists!");
            }

            const updatedUser = await UserService.Update(req.user.id, params);

            res.json({ user: updatedUser.rows[0], message: "Update Success!" });
        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;