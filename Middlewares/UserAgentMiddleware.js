module.exports = (req, res, next) => {
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
        for (let i in useragent) 
            if (useragent[i] === true)
                r.push(i);
        return r;
    }

    req.session = {
        browser,
        os,
        device: userAgentIs(device)
    }
    next()
}