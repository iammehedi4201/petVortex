import { Status } from "@prisma/client";
import z from "zod";

const CreateAdoptionRequestValidationSchema = z.object({
  body: z.object({
    petId: z.string(),
    petOwnershipExperience: z.string(),
  }),
});

const updateAdoptionRequestStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(Object.values(Status) as [string, ...string[]]),
  }),
});
export const adoptionRequestValidation = {
  CreateAdoptionRequestValidationSchema,
  updateAdoptionRequestStatusValidationSchema,
};
