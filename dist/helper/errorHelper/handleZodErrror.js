"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    //error source
    const errorDetails = {
        issues: err.issues.map((issue) => {
            return {
                field: issue.path.pop(),
                message: `${issue.path.pop()} field is  ${issue === null || issue === void 0 ? void 0 : issue.message}`,
            };
        }),
    };
    //error details
    const message = errorDetails.issues
        .map((error) => `${error.message}`)
        .join(" . ");
    return {
        statusCode: 400,
        success: false,
        message,
        errorDetails: errorDetails,
    };
};
exports.default = handleZodError;
