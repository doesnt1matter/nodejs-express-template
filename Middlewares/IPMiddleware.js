const ip = require("request-ip");

module.exports = (req, res, next) => {
    console.log("---IP INFO---");

    const ipInfo = {
        headerIp: req.header('x-forwarded-for'),
        remoteIp: req.socket.remoteAddress,
        requestIp: ip.getClientIp(req),

    }

    req.ipInfo = ipInfo;
    console.log(ipInfo);

    next()
}