"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    var _a, _b;
    return {
        statusCode: 400,
        status: "error",
        message: "Validation Error",
        errorDetails: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target)
            .map((target) => {
            return `${target} is already taken`;
        })
            .join(" . "),
        errorSource: ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.target).map((target) => {
            return {
                path: [target],
                message: `${target} is already taken`,
            };
        }),
    };
};
exports.default = handleDuplicateError;
