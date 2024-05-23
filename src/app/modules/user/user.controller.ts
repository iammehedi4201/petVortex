import catchAsync from "../../../Shared/catchAynsc";
import sendResponse from "../../../Shared/sendResponse";
import AppError from "../../../helper/errorHelper/appError";
import { userService } from "./user.service";

//! Get User Profile
const getUserProfileFromDB = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const result = await userService.getUserProfileFromDB(user);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile retrieved successfully",
    data: result,
  });
});

//! Update User Profile
const updateUserProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const { status } = req.body;
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const result = await userService.updateUserProfile(user, status);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile updated successfully",
    data: result,
  });
});

//! Update user status
const updateUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.updateUserStatus(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User status updated successfully",
    data: result,
  });
});

export const userController = {
  getUserProfileFromDB,
  updateUserProfile,
  updateUserStatus,
};
