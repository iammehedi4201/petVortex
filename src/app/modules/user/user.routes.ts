import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import { userController } from "./user.controller";
import ValidateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

//! Get User Profile
router.get(
  "/profile",
  checkAuth("ADMIN", "USER"),
  userController.getUserProfileFromDB
);

//! Update User Profile
router.put(
  "/profile",
  checkAuth("ADMIN", "USER"),
  ValidateRequest(userValidation.updateUserProfileValidationSchema),
  userController.updateUserProfile
);

//!Update user status
router.put(
  "/status/:id",
  checkAuth("ADMIN"),
  ValidateRequest(userValidation.updateUserStatusValidationSchema),
  userController.updateUserStatus
);

export const userRoutes = router;
