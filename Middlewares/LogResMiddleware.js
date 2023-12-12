const LogService = require("../Services/LogService.js");

module.exports = (req, res, next) => {
    res.on("finish", () => LogService.LogResponse(req, res))
    next()
}