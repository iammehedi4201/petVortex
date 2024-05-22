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
exports.userController = void 0;
const catchAynsc_1 = __importDefault(require("../../../Shared/catchAynsc"));
const sendResponse_1 = __importDefault(require("../../../Shared/sendResponse"));
const appError_1 = __importDefault(require("../../../helper/errorHelper/appError"));
const user_service_1 = require("./user.service");
//! Get User Profile
const getUserProfileFromDB = (0, catchAynsc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new appError_1.default("User not found", 404);
    }
    const result = yield user_service_1.userService.getUserProfileFromDB(user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User profile retrieved successfully",
        data: result,
    });
}));
//! Update User Profile
const updateUserProfile = (0, catchAynsc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new appError_1.default("User not found", 404);
    }
    const result = yield user_service_1.userService.updateUserProfile(user, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User profile updated successfully",
        data: result,
    });
}));
exports.userController = {
    getUserProfileFromDB,
    updateUserProfile,
};
