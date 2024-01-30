const Base = require("./BaseModel.js");
const JWT = require("jsonwebtoken");

module.exports = 
class JWTTokenModel extends Base
{
    type;
    value;
    expiresIn;

    constructor(type, userDTO)
    {
        super();
        this.type = type.toUpperCase();
        this.expiresIn = this.type == "REFRESH" ? "10m" : "1m";
        this.value = JWT.sign({...userDTO}, process.env._api_jwtkey, {expiresIn: this.expiresIn});;
    }

    Info() {
        console.log(this.type, this.value, this.expiresIn);
    };
}