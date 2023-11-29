exports.response = (statusCode, message) => {
    const response = {
        status_code: statusCode,
        message: JSON.stringify(message),
    }
    return response;
}