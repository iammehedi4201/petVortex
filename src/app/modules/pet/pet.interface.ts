import { Gender, HealthStatus } from "@prisma/client";

export type TPetPayload = {
  pet: {
    name: string;
    species: string;
    breed: string;
    age: number;
    size: string;
    gender: Gender;
    location: string;
    description: string;
    temperament: string;
    healthStatus: HealthStatus;
    speacialNeeds: string; // corrected typo
    medicalHistory: string;
    adoptionRequirements: string;
  };
  images: string[];
};
