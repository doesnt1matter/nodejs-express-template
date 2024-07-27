const User = require("../Models/UserModel.js");

class UserService {
    static Get(id) {
        let candidate;
        return candidate;
    }

    static Create(login, password, email, phone) {
        const user = new User(login, password, email, phone);
        return user;
    }
}

module.exports = UserService;