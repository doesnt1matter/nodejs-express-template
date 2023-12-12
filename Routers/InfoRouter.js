const Router = require("express").Router();
const InfoController = require("../Controllers/InfoController.js");

Router.get("/mem", (req, res) => {
    res.json({total: OS.totalmem() /1024 + " KB", freeMem: OS.freemem() /1024 + " KB"})
});

Router.get("/sys", (req, res) => {
    res.json(
        {
            hostname: OS.hostname(),
            type: OS.type(),
            platform: OS.platform(),
            machine: OS.machine(),
            arch: OS.arch(),
            karnel: OS.version(),
            overlap: OS.availableParallelism(),
            сpus: OS.cpus()
        })
});

Router.get("/if", (req, res) => {
    res.json({interfaces: OS.networkInterfaces()})
});

Router.get("/load", (req, res) => {
    res.json({load: OS.loadavg(), uptime: OS.uptime()})
});

Router.get("/mem", InfoController.GetMemory);
Router.get("/sys", InfoController.GetSystem);
Router.get("/if", InfoController.GetInterfaces);
Router.get("/load", InfoController.GetLoad);

module.exports = Router;
