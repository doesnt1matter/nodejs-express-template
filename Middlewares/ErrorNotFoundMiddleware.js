const ErrorService = require("../Services/ErrorService");

module.exports = (req, res, next) => {
    next(ErrorService.ThrowNotFound(`URL ${req.method}:${req.url} is not found!`));
}