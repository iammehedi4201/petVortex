import z from "zod";

const registerValidationSchema = z.object({
  body: z
    .object({
      name: z.string(),
      contactNo: z.string(),
      userName: z.string().min(3).max(255),
      email: z.string().email(),
      password: z.string(),
      confirmPassword: z.string(),
      profilePicture: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "password and confirm password must be same",
      path: ["confirmPassword"],
    }),
});

const loginValidationSchema = z.object({
  body: z.object({
    userName: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    password: z.string(),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z
    .object({
      oldPassword: z.string(),
      newPassword: z.string(),
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: "Old password and new password should not be same",
      path: ["newPassword"],
    }),
});
export const authValidation = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
};
