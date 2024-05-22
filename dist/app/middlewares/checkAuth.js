"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const catchAynsc_1 = __importDefault(require("../../Shared/catchAynsc"));
const prisma_1 = __importDefault(require("../../Shared/prisma"));
const config_1 = __importDefault(require("../../config/config"));
const appError_1 = __importDefault(require("../../helper/errorHelper/appError"));
const jwtError_1 = __importDefault(require("../../helper/errorHelper/jwtError"));
const jwtHelper_1 = require("../../helper/jwtHelper");
const checkAuth = () => {
    return (0, catchAynsc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new jwtError_1.default("Token not found", http_status_1.default.UNAUTHORIZED);
        }
        //: verify token
        const decoded = (0, jwtHelper_1.verifyToken)(token, config_1.default.jwt.jwt_access_token_secret);
        const { id } = decoded;
        //: check if user exists
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new appError_1.default("User not found", 404);
        }
        //: set user in request object
        req.user = decoded;
        next();
    }));
};
exports.default = checkAuth;
