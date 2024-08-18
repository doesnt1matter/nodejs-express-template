const ErrorService = require("../Services/ErrorService");
const UserService = require("../Services/UserService");


module.exports = async (req, res, next) => {
    try {
        const { id, username, email } = req.body;

        const identificator = id ?? username ?? email;

        //GET USER
        const userObj = await UserService.Get(`id='${identificator}' or username='${identificator}' or email='${identificator}'`);
        if (!userObj.rows.length) ErrorService.ThrowBadRequest("User is not exists!");
        else req.user = userObj.rows[0];

        next();
    }
    catch (error) {
        next(error)
    }
}