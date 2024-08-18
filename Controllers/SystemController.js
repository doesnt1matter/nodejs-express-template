const SystemService = require("../Services/SystemService.js");

class SystemController {
    static GetSystem(req, res, next) {
        try {
            const data = SystemService.GetSystemInfo();
            res.json(data);
        }
        catch (error) {
            next(error)
        }
    }
    static GetInterfaces(req, res, next) {
        try {
            const data = SystemService.GetInterfaces();
            res.json(data);
        }
        catch (error) {
            next(error)
        }
    }
    static GetLoad(req, res, next) {
        try {
            const data = SystemService.GetLoad();
            res.json(data);
        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = SystemController;
