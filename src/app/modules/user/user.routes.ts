import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import { userController } from "./user.controller";
import ValidateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

//! Get User Profile
router.get("/profile", checkAuth(), userController.getUserProfileFromDB);

//! Update User Profile
router.put(
  "/profile",
  checkAuth(),
  ValidateRequest(userValidation.updateUserProfileValidationSchema),
  userController.updateUserProfile
);

export const userRoutes = router;
