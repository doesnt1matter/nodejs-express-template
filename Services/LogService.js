const DateService = require("./DateService.js");
const IDService = require("./IDService.js");
const fs = require("node:fs");

class LogService {
    LogRequest(req) {
        const dt = DateService.Now().full;
        const userAgent = req.headers['user-agent'];
        const pid = IDService.GenerateNumericID();
        req.pid = pid;
        console.log(`${dt},${pid},${userAgent},${req.method},${req.originalUrl}`);
    }

    LogResponse(req, res) {
        const dt = DateService.Now().full;
        console.log(`${dt},${req.pid},${res.statusCode},${res.statusMessage}`);
    }

    LogError(req, error) {
        const dt = DateService.Now().full;
        console.log(`${dt},${req.pid},${error.statusCode},${error.type},${error.message}${error.statusCode >= 500 ? ","+error.stack : ""}`);
    }
}

module.exports = new LogService();
