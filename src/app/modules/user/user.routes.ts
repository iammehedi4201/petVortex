import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import ValidateRequest from "../../middlewares/validateRequest";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

//! get all users
router.get("/", checkAuth("ADMIN"), userController.getAllUsers);

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

//! Change User Role
router.put(
  "/role/:id",
  checkAuth("ADMIN"),
  ValidateRequest(userValidation.changeUserRoleValidationSchema),
  userController.updateUserRole
);

export const userRoutes = router;
