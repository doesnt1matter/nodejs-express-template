const Base = require("./BaseModel.js");
const CryptService = require("../Services/CryptService.js");

module.exports =
    class User extends Base {
        login;
        password;
        role = "USER";

        constructor(login, password, email, phone) {
            super();
            this.login = login;
            this.email = email;
            this.phone = phone;
            this.password = CryptService.Encrypt(password);
        }

        Info() {
            console.log(` ${this.id}:${this.login}:${this.role}-${JSON.stringify(this.updateDate)}`);
        }
    }