const DateService = require("./DateService.js");
const IDService = require("./IDService.js");
const FS = require("node:fs");

class LogService {
    LogRequest(req) {
        const dt = DateService.Now();
        const pid = IDService.GenerateNumericID();
        const session = req.session;
        const path = `./logs/requests/${dt.fullDate}${req.originalUrl.replaceAll("/", "-")}.log`
        const log = `${dt.full},${pid},${session.os.name}:${session.device},${session.browser.name}:${session.browser.version},${req.method},${req.originalUrl}`
        
        LogService.Record(path, log);

        req.pid = pid;
        console.log(log);
    }

    LogResponse(req, res) {
        const dt = DateService.Now();
        const path = `./logs/responses/${dt.fullDate}${req.originalUrl.replaceAll("/", "-")}.log`
        const log = `${dt.full},${req.pid},${res.statusCode},${res.statusMessage}`;

        LogService.Record(path, log);

        console.log(log + "\n");
    }

    LogError(req, error) {
        const dt = DateService.Now();
        const path = `./logs/errors/${dt.fullDate}${req.originalUrl.replaceAll("/", "-")}.log`
        const log = `${dt.full},${req.pid},${error.statusCode},${error.type},${error.message}${error.statusCode >= 500 ? ","+error.stack : ""}`;

        LogService.Record(path, log)

        console.log(log);
    }

    static Record(path, log) {
        if(FS.existsSync(path)) {
            FS.appendFileSync(path, log + "\n");
        }
        else {
            FS.writeFileSync(path, log + "\n");
        }
    }
}

module.exports = new LogService();
