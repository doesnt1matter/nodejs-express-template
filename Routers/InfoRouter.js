const Router = require("express").Router();
const OS = require("node:os");

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

module.exports = Router;