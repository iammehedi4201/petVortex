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
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = __importDefault(require("../../../helper/errorHelper/appError"));
const comparePasswordWithLastThreePasswords = (newPassword, passwordHistory) => __awaiter(void 0, void 0, void 0, function* () {
    for (const password of passwordHistory) {
        const isMatch = yield bcrypt_1.default.compare(newPassword, password.password);
        //format date in this format: 2021-08-01 at 11:00 PM
        const formatDate = new Date(password.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        if (isMatch) {
            throw new appError_1.default(`You have used this password on ${formatDate}. Please use a different password.`, 400);
        }
    }
});
exports.default = comparePasswordWithLastThreePasswords;
