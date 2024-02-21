class ApiError extends Error{
    constructor(statusCode,mes){
        super();
        this.statusCode = statusCode;
        this.message =mes;
    }
}
module.exports = ApiError;