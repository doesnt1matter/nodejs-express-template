const JWTModel = require("../Models/JWTModel.js");
const JWT = require("jsonwebtoken");
const PostgreSQLConnector = require("./PostgreSQLConnector.js");
const DateService = require("./DateService.js");

class JWTService {
    static async CreateAccess(payload) {
        const token = JWTModel("access", payload);
        // await PostgreSQLConnector.Query(`
        //     insert into accessTokens (id, user_id, createAt, updateAt, expiresAt, value)
        //     values ('${token.id}', '${token.userId}', '${token.createAt}', '${token.updateAt}', '${token.expiresAt}', '${token.value}');`);

        return token;
    };

    static async CreateRefresh(payload) {
        const token = new JWTModel("refresh", payload);

        // await PostgreSQLConnector.Query(`
        //     insert into refreshTokens (id, user_id, createAt, updateAt, expiresAt, value)
        //     values ('${token.id}', '${token.userId}', '${token.createAt}', '${token.updateAt}', '${token.expiresAt}', '${token.value}');`);

        return token;
    };

    static Verify(token) {
        let userDTO = null;

        JWT.verify(token, process.env._api_jwtkey, function (error, payload) {
            if (error) {
                console.error(error.message.toUpperCase() + "!");
            }
            else userDTO = payload;
        });

        return userDTO;
    }

    static async Refresh(refreshToken) {
        const payload = Verify(refreshToken);

        if (payload) return CreateAccess(payload);
        else return payload;
    }
}

module.exports = JWTService;