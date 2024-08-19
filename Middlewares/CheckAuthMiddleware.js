const ErrorService = require("../Services/ErrorService");
const JWTService = require("../Services/JWTService");

module.exports = (req, res, next) => {
    const refreshTokenCookie = JSON.parse(req.cookies?.refreshToken ?? "null");
    const accessTokenHeaders = req.headers.authorization ? req.headers.authorization.authorization?.split(" ")[1] : null

    const accessToken = { value: accessTokenHeaders, payload: JWTService.Verify(accessTokenHeaders) }
    const refreshToken = { value: refreshTokenCookie?.value ?? null, payload: JWTService.Verify(refreshTokenCookie?.value) }

    //CHECK TOKENS
    if (!refreshToken.payload) {
        JWTService.DeleteSession(refreshTokenCookie?.user.id, refreshTokenCookie?.user.device);
        ErrorService.ThrowUnauthorizedError("Session is deprecated!");
    }

    if (!accessToken.payload) ErrorService.ThrowUnauthorizedError("Do refresh!");

    req.tokens = { accessToken, refreshToken }

    next();
}