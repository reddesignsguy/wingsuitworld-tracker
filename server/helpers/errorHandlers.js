exports.response = (statusCode, message, stringify = true) => {
    const response = {
        status_code: statusCode,
        message: stringify ? JSON.stringify(message) : message,
    }
    return response;
}