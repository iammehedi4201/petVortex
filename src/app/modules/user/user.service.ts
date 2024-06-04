import { User, UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import AppError from "../../../helper/errorHelper/appError";
import { TJWTPayload } from "../auth/auth.interface";

//:get all users
const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      userName: true,
      contactNo: true,
      profilePicture: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
};

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
      userName: true,
      contactNo: true,
      profilePicture: true,
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
  console.log("payLoad---------", payLoad);
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
  console.log(status);

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
      status,
    },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return updatedUserStatus;
};

//! Update user role
const updateUserRole = async (id: string, role: UserRole) => {
  //:check if user exists
  console.log("id", id);

  const isUserExists = await prisma.user.findUnique({
    where: {
      id,
      status: "ACTIVE",
    },
  });

  console.log("isUserExists", isUserExists);

  if (!isUserExists) {
    throw new AppError("User not found", 404);
  }

  //:update user status
  const updatedUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return updatedUserStatus;
};

export const userService = {
  getAllUsers,
  getUserProfileFromDB,
  updateUserProfile,
  updateUserStatus,
  updateUserRole,
};
