const JWTTokenModel = require("../Models/JWTTokenModel.js");
const JWT = require("jsonwebtoken");

class TokenService {
    static CreateAccess(payload) {
        const accessToken = new JWTTokenModel("access", payload);
        return accessToken;
    };

    static CreateRefresh(payload) {
        const refreshToken = new JWTTokenModel("refresh", payload);
        return refreshToken;
    };

    static Verify(token) {
        let userDTO = null;

        JWT.verify(token, process.env._api_jwtkey, function (error, payload) {
            if (error) console.log("Token is expired!");
            else userDTO = payload;
        });

        return userDTO;
    }

    static Refresh(refreshToken) {
        const payload = Verify(refreshToken);

        if (payload) return CreateAccess(payload);
        else return payload;
    }
}

module.exports = TokenService;