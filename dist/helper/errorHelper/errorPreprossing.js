"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorPreprossing = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleZodErrror_1 = __importDefault(require("./handleZodErrror"));
const appError_1 = __importDefault(require("./appError"));
const handleDuplicateError_1 = __importDefault(require("./handleDuplicateError"));
const zod_1 = require("zod");
const jwtError_1 = __importDefault(require("./jwtError"));
const errorPreprossing = (err) => {
    //check if the error form zod
    if (err instanceof zod_1.ZodError) {
        return (0, handleZodErrror_1.default)(err);
    }
    else if (err.code === "P2002") {
        return (0, handleDuplicateError_1.default)(err);
    }
    else if (err instanceof appError_1.default) {
        return {
            statusCode: err.statusCode,
            success: false,
            message: "something went wrong",
            errorDetails: err.message,
        };
    }
    else if (err instanceof jwtError_1.default) {
        return {
            statusCode: err.statusCode,
            success: false,
            message: "Unauthorized Access",
            errorDetails: {
                status: err.statusCode,
                error: err.message,
            },
        };
    }
    else if (err instanceof Error) {
        return {
            statusCode: 500,
            success: false,
            message: "Something Went Wrong",
            errorDetails: err,
        };
    }
};
exports.errorPreprossing = errorPreprossing;
