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
exports.authController = void 0;
const catchAynsc_1 = __importDefault(require("../../../Shared/catchAynsc"));
const sendResponse_1 = __importDefault(require("../../../Shared/sendResponse"));
const auth_service_1 = require("./auth.service");
//! register user
const registerUser = (0, catchAynsc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.registerUser(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "User registered successfully",
        data: result,
    });
}));
//! Login user
const loginUser = (0, catchAynsc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.loginUser(req.body);
    const { refreshToken } = result;
    //: set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: result.data,
    });
}));
//! Refresh Token
// const refreshToken = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;
//   const result = await authService.refreshToken(refreshToken);
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Token refreshed successfully",
//     data: result,
//   });
// });
exports.authController = {
    registerUser,
    loginUser,
};
