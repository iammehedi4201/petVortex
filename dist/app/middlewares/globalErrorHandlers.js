"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const errorPreprossing_1 = require("../../helper/errorHelper/errorPreprossing");
const globalErrorHandler = (err, req, res, next) => {
    let errorResponse = {
        statusCode: err.statusCode || 500,
        success: false,
        message: err.message || "something went wrong",
        errorDetails: {
            issues: [
                {
                    field: "",
                    message: "something went wrong",
                },
            ],
        },
    };
    //error preprossing
    errorResponse = (0, errorPreprossing_1.errorPreprossing)(err);
    //Ultimately we will send this errorReponse to the client
    return res.status(errorResponse.statusCode).json({
        success: errorResponse.success,
        message: errorResponse.message,
        errorDetails: errorResponse.errorDetails,
        err,
    });
};
exports.globalErrorHandler = globalErrorHandler;
