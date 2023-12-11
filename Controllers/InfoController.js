const InfoService = require("../Services/InfoService.js");

class InfoController {
    GetMemory(req, res, next) {
        try {

        }
        catch (error) {
            next(error)
        }
    }

    GetSystem(req, res, next) {
        try {
            const data = InfoService.GetSystemInfo();
            res.json(data);
        }
        catch (error) {
            next(error)
        }
    }

    GetInterfaces(req, res, next) {
        try {
            const data = InfoService.GetInterfaces();
            res.json(data);
        }
        catch (error) {
            next(error)
        }
    }

    GetLoad(req, res, next) {
        try {
            const data = InfoService.GetLoad();
            res.json(data);
        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = new InfoController();