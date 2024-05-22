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
exports.userService = void 0;
const prisma_1 = __importDefault(require("../../../Shared/prisma"));
const appError_1 = __importDefault(require("../../../helper/errorHelper/appError"));
//! Get user profile
const getUserProfileFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    //:check if user exists
    const isUserExists = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!isUserExists) {
        throw new appError_1.default("User not found", 404);
    }
    return isUserExists;
});
//! Update user profile
const updateUserProfile = (user, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    //:check if user exists
    const isUserExists = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!isUserExists) {
        throw new appError_1.default("User not found", 404);
    }
    //:update user profile
    const updatedUserProfile = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payLoad,
    });
    return updatedUserProfile;
});
exports.userService = {
    getUserProfileFromDB,
    updateUserProfile,
};
