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

export const authValidation = {
  registerValidationSchema,
  loginValidationSchema,
};