const User = require("./User.js");

module.exports = 
class Admin extends User
{
    role = "ADMIN";

    constructor(login, password, email, phone, ipInfo, geoInfo)
    {
        super(login, password, email, phone, ipInfo, geoInfo);
    }
}