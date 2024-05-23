import bcypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import config from "../../../config/config";
import AppError from "../../../helper/errorHelper/appError";
import { generateToken, verifyToken } from "../../../helper/jwtHelper";
import {
  TChangePassword,
  TJWTPayload,
  TLoginUser,
  TRegisterUser,
} from "./auth.interface";
import comparePasswordWithLastThreePasswords from "./auth.utils";

//! Register user
const registerUser = async (payLoad: TRegisterUser) => {
  const { name, contactNo, userName, email, password, profilePicture } =
    payLoad;

  //: hash password
  const hashedPassword = await bcypt.hash(password, Number(config.SaltRounds));

  //: Create user data & password history data
  const result = await prisma.$transaction(async (transactionClient) => {
    //: create user
    const newUser = await transactionClient.user.create({
      data: {
        name,
        contactNo,
        userName,
        email,
        password: hashedPassword,
        profilePicture,
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

    await transactionClient.passwordHistory.create({
      data: {
        userId: newUser?.id,
        password: hashedPassword,
      },
    });
    return newUser;
  });

  return result;
};

//! login user
const loginUser = async (payLoad: TLoginUser) => {
  const { userName, email, password } = payLoad;

  console.log("userName", userName);
  console.log("email", email);
  console.log("password", password);

  //: check if user exists
  const user = await prisma.user.findFirst({
    where: {
      AND: [
        {
          OR: [
            {
              userName,
            },
            {
              email,
            },
          ],
        },
        {
          status: "ACTIVE",
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
    email: user?.email,
    role: user?.role,
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

//! Change Password
const changePassword = async (user: TJWTPayload, payLoad: TChangePassword) => {
  const { id, email } = user;

  //: check if user exists
  const userExists = await prisma.user.findUnique({
    where: {
      id,
      status: "ACTIVE",
    },
  });

  if (!userExists) {
    throw new AppError("user not found", 404);
  }

  //: check if old password is correct
  const isOldPasswordCorrect = await bcypt.compare(
    payLoad.oldPassword,
    userExists.password
  );

  if (!isOldPasswordCorrect) {
    throw new AppError("incorrect old password", 400);
  }

  //: get last 3 password history
  const passwordHistory = await prisma.passwordHistory.findMany({
    where: {
      userId: userExists.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  console.log("passwordHistory", passwordHistory);

  //: check if new password is in last three password and give date and time for last password change
  await comparePasswordWithLastThreePasswords(
    payLoad.newPassword,
    passwordHistory
  );

  //: hash new password
  const hashedPassword = await bcypt.hash(
    payLoad.newPassword,
    Number(config.SaltRounds)
  );

  const resutl = await prisma.$transaction(async (transactionClient) => {
    //: update user password
    await transactionClient.user.update({
      where: {
        id: userExists.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    //: save password history
    await transactionClient.passwordHistory.create({
      data: {
        userId: userExists.id,
        password: hashedPassword,
      },
    });
  });
  return resutl;
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
  changePassword,
};
