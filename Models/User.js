const Base = require("./Base.js");
const CryptService = require("../Services/CryptService.js");

module.exports = 
class User extends Base
{
    login;
    password;
    role = "USER";
    ipInfo;
    geoInfo;

    constructor(login, password, email, phone, ipInfo, geoInfo)
    {
        super();
        this.login = login;
        this.email = email;
        this.phone = phone;
        this.ipInfo = ipInfo;
        this.geoInfo = geoInfo;
        this.password = CryptService.Encrypt(password);
    }

    Info() {
        console.log(` ${this.id}:${this.login}:${this.role}-${JSON.stringify(this.updateDate)}`);
    }
}