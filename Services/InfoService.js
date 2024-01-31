const OS = require("node:os");

class InfoService {

    static GetSystemInfo() {
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

    static GetInterfaces() {
        const interfaces = { interfaces: OS.networkInterfaces() };
        return interfaces;
    }

    static GetLoad() {
        const load = { load: OS.loadavg() };
        return load;
    }
}

module.exports = InfoService;