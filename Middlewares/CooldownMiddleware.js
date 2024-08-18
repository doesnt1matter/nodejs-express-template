const ErrorService = require("../Services/ErrorService");

module.exports = (req, res, next) => {
    //LIMITS
    const requestLimit = JSON.parse(process.env.requestLimit);
    const errorLimit = JSON.parse(process.env.errorLimit);

    const shortCooldown = JSON.parse(process.env.shortCooldown);
    const longCooldown = JSON.parse(process.env.longCooldown);

    const now = Date.now();

    //ATTEMPTS OBJ
    let attempts = req.cookies.attempts ? JSON.parse(req.cookies.attempts) : { count: 0, resetTime: now + shortCooldown };
    let errors = req.cookies.errors ? JSON.parse(req.cookies.errors) : { count: 0, resetTime: now + longCooldown };

    //LIMIT RESET
    if (now > attempts.resetTime) { attempts = { count: 0, resetTime: now + shortCooldown }; }
    if (now > errors.resetTime) { errors = { count: 0, resetTime: now + longCooldown }; }

    //LIMIT ERRORS
    if (attempts.count >= requestLimit) {
        ErrorService.ThrowCooldown(`Too much requests! Try after ${Math.ceil((attempts.resetTime - now) / 1000)} seconds`);
    }

    if (errors.count >= errorLimit) {
        ErrorService.ThrowCooldown(`Too much errors! Try after ${Math.ceil((errors.resetTime - now) / 1000)} seconds`);
    }

    //LIMIT COUNT
    attempts.count += 1;
    res.cookie('attempts', JSON.stringify(attempts), { maxAge: shortCooldown, httpOnly: true });

    next();
}