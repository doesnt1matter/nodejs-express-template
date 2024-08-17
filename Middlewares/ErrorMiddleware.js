module.exports = (error, req, res, next) => {
    res.cookie("errors", req.cookies.errors ? JSON.parse(req.cookies.errors) + 1 : 1, { maxAge: process.env.longCooldown, httpOnly: true });

    error.statusCode = error.statusCode ?? 500
    error.type = error.type ?? "SERVER"

    console.error({ message: error.message, status: error.statusCode, stack: error.statusCode === 500 ? error.stack : "" });
    res.status(error.statusCode).json({ code: error.statusCode, type: error.type, message: error.statusCode >= 500 ? "Server error" : error.message });
}