const User = require("../Models/UserModel.js");

class UserService {
    static Get(id) {
        let candidate;
        return candidate;
    }

    static Create(login, password, email, phone, ipInfo, geoInfo) {
        const user = new User(login, password, email, phone, ipInfo, geoInfo);
        return user;
    }
}

module.exports = UserService;