const ip = require("request-ip");
const geoip = require('geoip-lite');

module.exports = (req, res, next) => {
    //console.log("---IP INFO---");

    const clientIp = ip.getClientIp(req)
    const ipInfo = {
        headerIp: req.header('x-forwarded-for'),
        remoteIp: req.socket.remoteAddress,
        requestIp: clientIp,
        isLocal: !!clientIp
    }
    req.ipInfo = ipInfo;
    //console.log(ipInfo);

    //console.log("---GEO INFO---")

    const geoInfo = geoip.lookup(clientIp);
    req.geoInfo = geoInfo;
    //console.log(geoInfo);

    next()
}