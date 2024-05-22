"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
//! Get User Profile
router.get("/profile", (0, checkAuth_1.default)(), user_controller_1.userController.getUserProfileFromDB);
//! Update User Profile
router.put("/profile", (0, checkAuth_1.default)(), (0, validateRequest_1.default)(user_validation_1.userValidation.updateUserProfileValidationSchema), user_controller_1.userController.updateUserProfile);
exports.userRoutes = router;
