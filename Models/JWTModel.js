const DateService = require("../Services/DateService.js");
const Base = require("./BaseModel.js");
const JWT = require("jsonwebtoken");

module.exports =
    class JWTModel extends Base {
        expiresAt;
        expiresIn;
        type;
        value;

        constructor(type, payload) {
            super();
            this.type = type;
            this.expiresIn = this.type == "refresh" ? process.env._refresh_expires : process.env._access_expires;
            this.expiresAt = DateService.Increment(this.createAt, this.type == "refresh" ? 30 : 15, "sec").timestamp;
            this.value = JWT.sign({ ...payload, expiresAt: this.expiresAt }, process.env._api_jwtkey, { expiresIn: this.expiresIn });
        }
    }