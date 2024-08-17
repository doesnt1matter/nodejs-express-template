const ErrorService = require("../Services/ErrorService");

module.exports = (req, res, next) => {
    const requestLimit = JSON.parse(process.env.requestLimit);
    const errorLimit = JSON.parse(process.env.errorLimit);
    const shortCooldown = JSON.parse(process.env.shortCooldown);
    const longCooldown = JSON.parse(process.env.longCooldown);

    const now = Date.now();
    const resetTime = now + shortCooldown;

    let attempts = req.cookies.attempts ? JSON.parse(req.cookies.attempts) : { count: 0, resetTime };
    let errors = req.cookies.errors ? JSON.parse(req.cookies.errors) : 0;

    if (now > attempts.resetTime) { attempts = { count: 0, resetTime }; }

    if (attempts.count >= requestLimit) {
        ErrorService.ThrowCooldown();
    }

    if (errors >= errorLimit) {
        ErrorService.ThrowCooldown(`Limit ends! Try again after ${longCooldown / 1000} seconds.`);
    }

    attempts.count += 1;
    console.log(errors);
    res.cookie('attempts', JSON.stringify(attempts), { maxAge: shortCooldown, httpOnly: true });

    next();
}