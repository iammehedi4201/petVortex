"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
//! Register user route
router.post("/register", (0, validateRequest_1.default)(auth_validation_1.authValidation.registerValidationSchema), auth_controller_1.authController.registerUser);
//! Login user route
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.authValidation.loginValidationSchema), auth_controller_1.authController.loginUser);
//! Refresh Token route
// router.post("/refresh-token", authController.refreshToken);
exports.authRoutes = router;
