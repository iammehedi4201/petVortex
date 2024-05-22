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
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../Shared/prisma"));
const config_1 = __importDefault(require("../../../config/config"));
const appError_1 = __importDefault(require("../../../helper/errorHelper/appError"));
const jwtHelper_1 = require("../../../helper/jwtHelper");
//! Register user
const registerUser = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = payLoad;
    //: hash password
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.SaltRounds));
    //: create user
    const newUser = yield prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return newUser;
});
//! login user
const loginUser = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payLoad;
    //: check if user exists
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new appError_1.default("user not found", 404);
    }
    //: check if password is correct
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default("incorrect password", 400);
    }
    //: Create Access Token
    const jwtPayload = {
        id: user.id,
    };
    const accessToken = (0, jwtHelper_1.generateToken)(jwtPayload, config_1.default.jwt.jwt_access_token_secret, config_1.default.jwt.jwt_access_token_expires_in);
    //:create refresh token
    const refreshToken = (0, jwtHelper_1.generateToken)(jwtPayload, config_1.default.jwt.jwt_refresh_token_secret, config_1.default.jwt.jwt_refresh_token_expires_in);
    return {
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            token: accessToken,
        },
        refreshToken,
    };
});
//! Refresh Token
// const refreshToken = async (refreshToken: string) => {
//   //: verify refresh token
//   const { email, role } = verifyToken(
//     refreshToken,
//     config.jwt.jwt_refresh_token_secret
//   );
//   //:check if user exists and status is active
//   const user = await prisma.user.findUnique({
//     where: {
//       email,
//       status: "ACTIVE",
//     },
//   });
//   if (!user) {
//     throw new AppError("user not found", 404);
//   }
//   //: Create Access Token
//   const JwtPayload = {
//     email,
//     role,
//   };
//   const accessToken = generateToken(
//     JwtPayload,
//     config.jwt.jwt_access_token_secret,
//     config.jwt.jwt_access_token_expires_in
//   );
//   return {
//     accessToken,
//   };
// };
exports.authService = {
    registerUser,
    loginUser,
};
