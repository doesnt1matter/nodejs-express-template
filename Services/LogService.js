const DateService = require("./DateService.js");
const IDService = require("./IDService.js");
const FS = require("node:fs");

class LogService {
    LogRequest(req) {
        const dt = DateService.Now();
        const pid = IDService.GenerateNumericID();
        const session = req.session;
        const host = req.rawHeaders[1];

        const path = `./logs/requests${req.originalUrl}`;
        const filename = `${dt.fullDate}${req.originalUrl.replaceAll("/", "-")}.log`;
        
        //const log = `${dt.full},${pid},${session.os.name}:${session.device},${session.browser.name}:${session.browser.version},${host},${req.method},${req.originalUrl}`
        const log = {
            date: dt.full,
            pid: pid,
            OS: session.os.name,
            device: session.device,
            browser: `${session.browser.name}:${session.browser.version}`,
            APIhost: host,
            method: req.method,
            URL: req.originalUrl,
            ipInfo: req.ipInfo,
            geoInfo: req.geoInfo
        } 
        
        LogService.Record(path, filename, JSON.stringify(log));

        req.pid = pid;

        console.log(`---REQUEST---${dt.full}---${pid}`);
        //console.log(log);
    }

    LogResponse(req, res) {
        const dt = DateService.Now();
        const path = `./logs/responses${req.originalUrl}`;
        const filename = `${dt.fullDate}${req.originalUrl.replaceAll("/", "-")}.log`;
        
        //const log = `${dt.full},${req.pid},${res.statusCode},${res.statusMessage}`;
        const log = {
            date: dt.full,
            pid: req.pid,
            statusCode: res.statusCode,
            statusMessage: res.statusMessage
        } 

        LogService.Record(path, filename, JSON.stringify(log));

        console.log(`---RESPONSE---${dt.full}---${req.pid}`);
        //console.log(log);
    }

    LogError(req, error) {
        const dt = DateService.Now();
        const path = `./logs/errors${req.originalUrl}`;
        const filename = `${dt.fullDate}${req.originalUrl.replaceAll("/", "-")}.log`;
        
        //const log = `${dt.full},${req.pid},${error.statusCode},${error.type},${error.message}${error.statusCode >= 500 ? "," + error.stack : ""}`;
        const log = {
            date: dt.full,
            pid: req.pid,
            statusCode: error.statusCode,
            message: error.message,
            isFatal: error.statusCode >= 500,
            stack: error.statusCode >= 500 ? "," + error.stack : ""
        } 

        LogService.Record(path, filename, JSON.stringify(log));

        console.log(`---ERROR---${dt.full}---${req.pid}`);
        console.log(error);
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