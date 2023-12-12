const LogService = require("../Services/LogService.js");

module.exports = (req, res, next) => {
    LogService.LogRequest(req);
    next();
}
