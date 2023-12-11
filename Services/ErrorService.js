class ErrorService {
    ThrowUnauthorizedError(message)
    {
        let error = new Error(message);
        error.statusCode = 401;
        error.type = "UNAUTH"
        throw error;
    }

    ThrowBadRequest(message)
    {
        let error = new Error(message);
        error.statusCode = 400;
        error.type = "BADREQUEST"
        throw error;
    }

    ThrowServerError()
    {
        let error = new Error("Server Error");
        error.statusCode = 500;
        error.type = "SERVER"
        throw error;
    }
}

module.exports = new ErrorService();