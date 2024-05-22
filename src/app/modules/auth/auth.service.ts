import bcypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import config from "../../../config/config";
import AppError from "../../../helper/errorHelper/appError";
import { generateToken, verifyToken } from "../../../helper/jwtHelper";
import { TLoginUser, TRegisterUser } from "./auth.interface";

//! Register user
const registerUser = async (payLoad: TRegisterUser) => {
  const { name, contactNo, userName, email, password } = payLoad;

  //: hash password
  const hashedPassword = await bcypt.hash(password, Number(config.SaltRounds));

  //: create user
  const newUser = await prisma.user.create({
    data: {
      name,
      contactNo,
      userName,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      contactNo: true,
      userName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return newUser;
};

//! login user
const loginUser = async (payLoad: TLoginUser) => {
  const { userName, email, password } = payLoad;

  //: check if user exists
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          userName,
        },
        {
          email,
        },
      ],
    },
  });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  //: check if password is correct
  const isPasswordCorrect = await bcypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError("incorrect password", 400);
  }

  //: Create Access Token
  const jwtPayload = {
    id: user.id,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt.jwt_access_token_secret,
    config.jwt.jwt_access_token_expires_in
  );

  //:create refresh token
  const refreshToken = generateToken(
    jwtPayload,
    config.jwt.jwt_refresh_token_secret,
    config.jwt.jwt_refresh_token_expires_in
  );

  return {
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: accessToken,
    },
    refreshToken,
  };
};

//! Refresh Token
// const refreshToken = async (refreshToken: string) => {
//   //: verify refresh token
//   const { email, role } = verifyToken(
//     refreshToken,
//     config.jwt.jwt_refresh_token_secret
//   );

//   //:check if user exists and status is active
//   const user = await prisma.user.findUnique({
//     where: {
//       email,
//       status: "ACTIVE",
//     },
//   });

//   if (!user) {
//     throw new AppError("user not found", 404);
//   }

//   //: Create Access Token
//   const JwtPayload = {
//     email,
//     role,
//   };

//   const accessToken = generateToken(
//     JwtPayload,
//     config.jwt.jwt_access_token_secret,
//     config.jwt.jwt_access_token_expires_in
//   );

//   return {
//     accessToken,
//   };
// };

export const authService = {
  registerUser,
  loginUser,
};
