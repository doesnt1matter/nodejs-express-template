module.exports = (error, req, res, next) => {
    //COUNT ERRORS
    const now = Date.now();
    const longCooldown = JSON.parse(process.env.longCooldown);
    const resetTime = now + longCooldown;
    const errorsLimit = JSON.parse(process.env.errorLimit);

    let errors = req.cookies.errors ? JSON.parse(req.cookies.errors) : { count: 0, resetTime };
    errors.count += 1;

    if (errors.count <= errorsLimit) res.cookie("errors", JSON.stringify(errors), { maxAge: longCooldown, httpOnly: true });

    //HANDLE ERRORS
    error.statusCode = error.statusCode ?? 500
    error.type = error.type ?? "SERVER"

    console.error({ message: error.message, status: error.statusCode, stack: error.statusCode === 500 ? error.stack : "" });
    res.status(error.statusCode).json({ code: error.statusCode, type: error.type, message: error.statusCode >= 500 ? "Server error" : error.message });
}