const JWTModel = require("../Models/JWTModel.js");
const JWT = require("jsonwebtoken");
const PostgreSQLConnector = require("./PostgreSQLConnector.js");
const DateService = require("./DateService.js");

class JWTService {
    static GenerateJWT(type, payload) {
        const token = new JWTModel(type, payload);
        return token;
    }

    static async CreateAccess(payload) {
        const token = JWTService.GenerateJWT("access", payload)

        await PostgreSQLConnector.Query(`
            insert into access_tokens (id, user_id, device, createAt, expiresAt, value)
            values ('${token.id}',
            '${payload.userId}',
            '${payload.session.id}',
            '${token.createAt}',
            '${token.expiresAt}',
            '${token.value}');`);

        return token;
    };
    static async CreateRefresh(payload) {
        const token = JWTService.GenerateJWT("refresh", payload)

        await PostgreSQLConnector.Query(`
            insert into refresh_tokens (id, user_id, device, createAt, expiresAt, value)
            values ('${token.id}', 
            '${payload.userId}',
            '${payload.session.id}',
            '${token.createAt}',
            '${token.expiresAt}',
            '${token.value}');`);

        return token;
    };

    static Verify(token) {
        let userDTO = null;

        JWT.verify(token, process.env._api_jwtkey, (error, payload) => {
            if (!error) userDTO = payload;
        });

        return userDTO;
    }

    static async Refresh(refreshToken) {
        //GET PAYLOAD FROM REFRESHTOKEN
        const payload = JWTService.Verify(refreshToken);
        delete payload.iat;
        delete payload.exp;

        const accessToken = JWTService.GenerateJWT("access", payload);

        await PostgreSQLConnector.Query(`
            update access_tokens
            set createat='${accessToken.createAt}',
            expiresat='${accessToken.expiresAt}',
            value='${accessToken.value}'
            where user_id='${payload.userId}' and device='${payload.session.id}'
            `);

        //REFRESHING ACCESS
        if (payload) return accessToken
        else return payload;
    }

    static async DeleteSession(userId, device) {
        await PostgreSQLConnector.Query(`delete from access_tokens where user_id='${userId}' and device='${device}'`);
        await PostgreSQLConnector.Query(`delete from refresh_tokens where user_id='${userId}' and device='${device}'`);
    }
}

module.exports = JWTService;