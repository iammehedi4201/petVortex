import z from "zod";

const updateUserProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

const updateUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]),
  }),
});

const changeUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.enum(["ADMIN", "USER"]),
  }),
});

export const userValidation = {
  updateUserProfileValidationSchema,
  updateUserStatusValidationSchema,
  changeUserRoleValidationSchema,
};
