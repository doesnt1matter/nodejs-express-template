const DateService = require("../Services/DateService.js");
const TokenService = require("../Services/JWTService.js");
const UserService = require("../Services/UserService.js");
const PasswordService = require("../Services/PasswordService.js");
const ErrorService = require("../Services/ErrorService.js");
const JWTService = require("../Services/JWTService.js");
const PostgreSQLConnector = require("../Services/PostgreSQLConnector.js");

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
            const accessToken = await JWTService.CreateAccess({ userId: req.user.id, session: req.session });
            const refreshToken = await JWTService.CreateRefresh({ userId: req.user.id, session: req.session });

            res.cookie("refreshToken",
                JSON.stringify({ user: { id: req.user.id, device: req.session.id }, value: refreshToken.value }),
                { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.json({ accessToken: accessToken.value });
        }
        catch (error) {
            next(error)
        }
    }
    static async Logout(req, res, next) {
        try {
            const refreshToken = JSON.parse(req.cookies?.refreshToken ?? "null");
            JWTService.DeleteSession(refreshToken?.user.id, refreshToken?.user.device);
            res.clearCookie("refreshToken");
        }
        catch (error) {
            next(error)
        }
    }
    static async Refresh(req, res, next) {
        try {
            const refreshToken = JSON.parse(req.cookies?.refreshToken ?? "null");

            if (!JWTService.Verify(refreshToken?.value)) {
                JWTService.DeleteSession(refreshToken?.user.id, refreshToken?.user.device);
                ErrorService.ThrowUnauthorizedError("Session is deprecated!");
            }

            const accessToken = await JWTService.Refresh(refreshToken?.value);

            res.json({ accessToken });
        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController;