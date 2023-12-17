const OS = require("node:os");

class InfoService {

    GetSystemInfo() {
        const info = {
            hostname: OS.hostname(),
            type: OS.type(),
            platform: OS.platform(),
            machine: OS.machine(),
            arch: OS.arch(),
            karnel: OS.version(),
            overlap: OS.availableParallelism(),
            сpus: OS.cpus(),
            totalMem: OS.totalmem() / 1024 + " KB",
            freeMem: OS.freemem() / 1024 + " KB",
            uptime: OS.uptime()
        };

        return info;
    }

    GetInterfaces() {
        const interfaces = { interfaces: OS.networkInterfaces() };
        return interfaces;
    }

    GetLoad() {
        const load = { load: OS.loadavg() };
        return load;
    }
}

module.exports = new InfoService();
