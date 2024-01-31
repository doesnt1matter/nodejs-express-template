const InfoService = require("../Services/InfoService.js");

class InfoController {
    
    static GetSystem(req, res, next) {
        try {
            const data = InfoService.GetSystemInfo();
            res.json(data);
        }
        catch (error) {
            next(error)
        }
    }

    static GetInterfaces(req, res, next) {
        try {
            const data = InfoService.GetInterfaces();

            res.json(data);
        }
        catch (error) {
            next(error)
        }
    }

    static GetLoad(req, res, next) {
        try {
            const data = InfoService.GetLoad();
            res.json(data);
        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = InfoController;
