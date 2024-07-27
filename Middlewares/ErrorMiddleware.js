module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode ?? 500
    error.type = error.type ?? "SERVER"

    console.log("ERROR MIDDLEWARE");
    console.error(error.message);
    res.status(error.statusCode)
        .json({ code: error.statusCode, type: error.type, message: error.statusCode >= 500 ? "Server error" : error.message });
}
