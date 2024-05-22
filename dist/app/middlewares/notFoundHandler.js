"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Api Not Found",
        errorDetails: {
            path: req.originalUrl,
            message: "Api Not Found",
        },
    });
};
exports.default = notFoundHandler;
