import z from "zod";

const updateUserProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export const userValidation = {
  updateUserProfileValidationSchema,
};
