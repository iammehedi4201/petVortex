import z from "zod";

const createPetValidationSchema = z.object({
  body: z.object({
    pet: z.object({
      name: z.string(),
      species: z.string(),
      breed: z.string(),
      age: z.number().int(),
      size: z.string(),
      location: z.string(),
      description: z.string(),
      temperament: z.string(),
      medicalHistory: z.string(),
      adoptionRequirements: z.string(),
      gender: z.enum(["MALE", "FEMALE"]),
      healthStatus: z.enum(["VACCINATED", "SPAYED", "NEUTERED"]),
      speacialNeeds: z.string(),
    }),
    images: z.array(z.string()),
  }),
});

const updatePetValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    species: z.string().optional(),
    breed: z.string().optional(),
    age: z.number().int().optional(),
    size: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    temperament: z.string().optional(),
    medicalHistory: z.string().optional(),
    adoptionRequirements: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
    healthStatus: z.enum(["VACCINATED", "SPAYED", "NEUTERED"]).optional(),
    speecialNeeds: z.string().optional(),
  }),
});

export const petValidation = {
  createPetValidationSchema,
  updatePetValidationSchema,
};
