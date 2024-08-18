const Base = require("./BaseModel.js");
const JWT = require("jsonwebtoken");

module.exports =
    class JWTModel extends Base {
        type;
        value;
        expiresIn;

        constructor(type, payload) {
            super();
            this.type = type;
            this.expiresIn = this.type == "refresh" ? "15s" : "5s";
            this.expiresAt = DateService.Increment(this.createAt, 5, "sec").timestamp;
            this.value = JWT.sign({ ...payload }, process.env._api_jwtkey, { expiresIn: this.expiresIn });
        }

        Info() {
            console.log(this.type, this.value, this.expiresIn);
        };
    }