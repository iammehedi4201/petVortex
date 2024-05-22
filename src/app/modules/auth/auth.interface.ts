import { UserRole } from "@prisma/client";

export type TRegisterUser = {
  name: string;
  contactNo: string;
  userName: string;
  email: string;
  password: string;
};

export type TLoginUser = {
  userName: string;
  email: string;
  password: string;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type TJWTPayload = {
  id: string;
  email: string;
  role: UserRole;
};
