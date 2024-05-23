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

export const userValidation = {
  updateUserProfileValidationSchema,
  updateUserStatusValidationSchema,
};
