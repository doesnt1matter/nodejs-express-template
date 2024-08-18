const ErrorService = require("../Services/ErrorService");
const PasswordService = require("../Services/PasswordService");

module.exports = async (req, res, next) => {
    try {
        const { password } = req.body;
        const userObj = req.user;

        //FIND PASSWORD FOR USER
        const passwordObj = await PasswordService.Get(`user_id='${userObj.id}'`);

        //AUTHORIZATION
        const validate = PasswordService.Compare(password, passwordObj.rows[0].value);
        if (!validate) ErrorService.ThrowBadRequest("Password is not valid!");
        else req.password = passwordObj;

        next();
    } catch (error) {
        next(error);
    }
}