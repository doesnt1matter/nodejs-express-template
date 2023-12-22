const DateService = require("./DateService.js");
const IDService = require("./IDService.js");
const FS = require("node:fs");

class LogService {
    LogRequest(req) {
        const dt = DateService.Now();
        const pid = IDService.GenerateNumericID();
        const session = req.session;

        const path = `./logs/requests${req.originalUrl}`;
        const filename = `${dt.fullDate}${req.originalUrl.replaceAll("/", "-")}.log`;
        const log = `${dt.full},${pid},${session.os.name}:${session.device},${session.browser.name}:${session.browser.version},${req.method},${req.originalUrl}`
        
        LogService.Record(path, filename, log);

        req.pid = pid;
        console.log(log);
    }

    LogResponse(req, res) {
        const dt = DateService.Now();
        const path = `./logs/responses${req.originalUrl}`;
        const filename = `${dt.fullDate}${req.originalUrl.replaceAll("/", "-")}.log`;
        const log = `${dt.full},${req.pid},${res.statusCode},${res.statusMessage}`;

        LogService.Record(path, filename, log);

        console.log(log + "\n");
    }

    LogError(req, error) {
        const dt = DateService.Now();
        const path = `./logs/errors${req.originalUrl}`;
        const filename = `${dt.fullDate}${req.originalUrl.replaceAll("/", "-")}.log`;
        const log = `${dt.full},${req.pid},${error.statusCode},${error.type},${error.message}${error.statusCode >= 500 ? "," + error.stack : ""}`;

        LogService.Record(path, filename, log);

        console.log(log);
    }

    static Record(path, filename, log) {
        const isFileExists = FS.existsSync(`${path}/${filename}`);
        const isDirExists = FS.existsSync(`${path}`);

        if(!isDirExists) {
            path.split("/").reduce((accum, current) => {
                if(!FS.existsSync(`${accum}/${current}`)) FS.mkdirSync(`${accum}/${current}`, (error) => console.log(error))
                return `${accum}/${current}`;
            })
        }
        
        if(isFileExists) {
            FS.appendFileSync(`${path}/${filename}`, log + "\n");
        }
        else {
            FS.writeFileSync(`${path}/${filename}`, log + "\n");
        }
    }
}

module.exports = new LogService();
