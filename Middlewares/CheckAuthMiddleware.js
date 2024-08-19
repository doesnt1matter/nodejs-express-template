const ErrorService = require("../Services/ErrorService");
const JWTService = require("../Services/JWTService");

module.exports = (req, res, next) => {
    const refreshTokenCookie = JSON.parse(req.cookies?.refreshToken ?? "null");

    const accessToken = { value: req.headers.authorization.split(" ")[1], payload: JWTService.Verify(req.headers.authorization.split(" ")[1]) }
    const refreshToken = { value: req.cookies.refreshToken, payload: JWTService.Verify(refreshTokenCookie?.value) }

    //CHECK TOKENS
    if (!refreshToken.payload) {
        JWTService.DeleteSession(refreshTokenCookie?.user.id, refreshTokenCookie?.user.device);
        ErrorService.ThrowUnauthorizedError("Session is deprecated!");
    }

    if (!accessToken.payload) ErrorService.ThrowUnauthorizedError("Do refresh!");

    req.tokens = { accessToken, refreshToken }

    next();
}