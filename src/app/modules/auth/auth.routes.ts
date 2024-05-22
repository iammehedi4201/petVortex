import express from "express";
import ValidateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import checkAuth from "../../middlewares/checkAuth";

const router = express.Router();

//! Register user route
router.post(
  "/register",
  ValidateRequest(authValidation.registerValidationSchema),
  authController.registerUser
);

//! Login user route
router.post(
  "/login",
  ValidateRequest(authValidation.loginValidationSchema),
  authController.loginUser
);

//! Change Password route
router.post(
  "/change-password",
  checkAuth("ADMIN", "USER"),
  ValidateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword
);

//! Refresh Token route
// router.post("/refresh-token", authController.refreshToken);

export const authRoutes = router;
