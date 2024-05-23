import { User, UserStatus } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import AppError from "../../../helper/errorHelper/appError";
import { TJWTPayload } from "../auth/auth.interface";

//! Get user profile
const getUserProfileFromDB = async (user: TJWTPayload) => {
  const { id } = user;

  //:check if user exists
  const isUserExists = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!isUserExists) {
    throw new AppError("User not found", 404);
  }

  return isUserExists;
};

//! Update user profile
const updateUserProfile = async (user: TJWTPayload, payLoad: Partial<User>) => {
  const { id } = user;

  //:check if user exists
  const isUserExists = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!isUserExists) {
    throw new AppError("User not found", 404);
  }

  //:update user profile
  const updatedUserProfile = await prisma.user.update({
    where: {
      id,
    },
    data: payLoad,
  });
  return updatedUserProfile;
};

//! Update user status
const updateUserStatus = async (id: string, status: UserStatus) => {
  //:check if user exists
  const isUserExists = await prisma.user.findUnique({
    where: {
      id,
      status: "ACTIVE",
    },
  });
  if (!isUserExists) {
    throw new AppError("User not found", 404);
  }

  //:update user status
  const updatedUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status: status,
    },
  });
  return updatedUserStatus;
};

export const userService = {
  getUserProfileFromDB,
  updateUserProfile,
  updateUserStatus,
};
