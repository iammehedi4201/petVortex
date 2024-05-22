"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtError_1 = __importDefault(require("./errorHelper/jwtError"));
const http_status_1 = __importDefault(require("http-status"));
const generateToken = (payLoad, secret, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payLoad, secret, {
        algorithm: "HS256",
        expiresIn,
    });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token, secret) => {
    const decoded = jsonwebtoken_1.default.verify(token, secret, function (err, decoded) {
        if (err) {
            throw new jwtError_1.default("Invalid Token", http_status_1.default.UNAUTHORIZED);
        }
        return decoded;
    });
    return decoded;
};
exports.verifyToken = verifyToken;
