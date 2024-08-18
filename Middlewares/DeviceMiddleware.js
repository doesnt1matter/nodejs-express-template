const ip = require("request-ip");
const geoip = require('geoip-lite');

module.exports = (req, res, next) => {
    const clientIp = ip.getClientIp(req)
    const ipInfo = {
        headerIp: req.header('x-forwarded-for'),
        remoteIp: req.socket.remoteAddress,
        requestIp: clientIp,
        isLocal: !!clientIp
    }

    const geoInfo = geoip.lookup(clientIp);

    const browser = { name: req.useragent.browser, version: req.useragent.version };
    const os = { name: req.useragent.os, platform: req.useragent.platform };
    const device = {
        mobile: req.useragent.isMobile,
        tablet: req.useragent.isTablet,
        iPad: req.useragent.isiPad,
        iPod: req.useragent.isiPod,
        iPhone: req.useragent.isiPhone,
        Android: req.useragent.isAndroid,
        Desktop: req.useragent.isDesktop,
        Mac: req.useragent.isMac,
        Raspberry: req.useragent.isRaspberry
    };

    let userAgentIs = (useragent) => {
        let r = [];
        for (let i in useragent) if (useragent[i] === true) r.push(i);
        return r;
    }

    const deviceId = (browser.name + browser.version + os.name + os.platform + userAgentIs(device).join("")).replaceAll(".", "").replaceAll(" ", "");

    req.ipInfo = ipInfo;
    req.geoInfo = geoInfo;
    req.session = {
        browser,
        os,
        device: userAgentIs(device),
        deviceId: deviceId.toLowerCase()
    }

    console.log(req.geoInfo);
    console.log(req.ipInfo);
    console.log(req.session);

    next()
}