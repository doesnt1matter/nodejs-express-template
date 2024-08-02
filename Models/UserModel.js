const Base = require("./BaseModel.js");

module.exports =
    class User extends Base {
        username;
        role = "USER";

        constructor(username, email, password, phone) {
            super();
            this.username = username;
            this.email = email;
            this.phone = phone;
        }

        Info() {
            console.log(` ${this.id}:${this.login}:${this.role}-${JSON.stringify(this.updateAt)}`);
        }
    }