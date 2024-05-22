"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
//: Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    SaltRounds: process.env.SALT_ROUNDS,
    jwt: {
        jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwt_access_token_expires_in: process.env
            .JWT_ACCESS_TOKEN_EXPIRES_IN,
        jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        jwt_refresh_token_expires_in: process.env
            .JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
    reset_password_url_local: process.env.RESET_PASS_URL_LOCAL,
    sendEmail: {
        email: process.env.EMAIL,
        app_password: process.env.APP_PASSWORD,
        email_service: process.env.EMAIL_SERVICE,
    },
};
