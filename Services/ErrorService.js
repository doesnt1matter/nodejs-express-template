class ErrorService {
    static ThrowUnauthorizedError(message) {
        let error = new Error(message ?? "Not auth!");
        error.statusCode = 401;
        error.type = "UNAUTH"
        throw error;
    }

    static ThrowNotFound(message) {
        let error = new Error(message ?? "Not Found!");
        error.statusCode = 404;
        error.type = "NOTFOUND"
        throw error;
    }

    static ThrowBadRequest(message) {
        let error = new Error(message ?? "Bad request!");
        error.statusCode = 400;
        error.type = "BADREQUEST"
        throw error;
    }

    static ThrowCooldown(message) {
        let error = new Error(message ?? "Too much requests!");
        error.statusCode = 429;
        error.type = "COOLDOWN"
        throw error;
    }

    static ThrowServerError() {
        let error = new Error("Server Error");
        error.statusCode = 500;
        error.type = "SERVER"
        throw error;
    }
}

module.exports = ErrorService;
