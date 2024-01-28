const InfoService = require("../Services/InfoService.js");
const User = require("../Models/User.js");

class InfoController {
    
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
