const User = require("../Models/UserModel.js");
const PasswordService = require("./PasswordService.js");
const PostgreSQLConnector = require("./PostgreSQLConnector.js");

class UserService {
    static async Get(condition) {
        return await PostgreSQLConnector.Query(`select * from users where ${condition};`);
    }

    static async Create(username, email, password) {
        const user = new User(username, email, password);

        await PostgreSQLConnector.Query(`
                insert into users (id, createAt, updateAt, username, role, email, phone) 
                values ('${user.id}', '${user.createAt}', '${user.updateAt}', '${user.username}', '${user.role}', '${user.email}', '${user.phone}');`
        )

        return user;
    }

    static async Delete(identificator) {
        await PasswordService.Delete(identificator);

        await PostgreSQLConnector.Query(`
            delete from users where id='${identificator}' or email='${identificator}'
            `
        )
    }

    static async Update() {

    }
}

module.exports = UserService;