import catchAsync from "../../../Shared/catchAynsc";
import sendResponse from "../../../Shared/sendResponse";
import { TJWTPayload } from "./auth.interface";
import { authService } from "./auth.service";

//! register user
const registerUser = catchAsync(async (req, res) => {
  const result = await authService.registerUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

//! Login user
const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  const { refreshToken } = result;
  //: set refresh token in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
  });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: result.data,
  });
});

//! Change Password
const changePassword = catchAsync(async (req, res) => {
  const { user } = req;
  const result = await authService.changePassword(
    user as TJWTPayload,
    req.body
  );
});

//! Refresh Token
// const refreshToken = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;
//   const result = await authService.refreshToken(refreshToken);
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Token refreshed successfully",
//     data: result,
//   });
// });

export const authController = {
  registerUser,
  loginUser,
  changePassword,
};
