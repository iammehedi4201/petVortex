import { Pet, Prisma } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import { Toptions } from "../../interfaces/paginationAndSortOptions";
import { petSearchAbleFields } from "./pet.constant";
import createFilterConditions from "../../../helper/filterHelper";
import generatePaginationAndSortOptions from "../../../helper/paginationHelper";
import AppError from "../../../helper/errorHelper/appError";

//! Create Pet To DB
const createPetToDB = async (payLoad: Pet) => {
  //: createPet
  const newPet = await prisma.pet.create({
    data: payLoad,
  });
  return newPet;
};

//! Get All Pets From DB
const getAllPetsFromDB = async (
  filterOptions: Record<string, unknown>,
  options: Toptions
) => {
  //:Filter Conditions
  const conditions = createFilterConditions(filterOptions);
  const { page, take, skip, sortBy, sortOrder } =
    generatePaginationAndSortOptions(options);

  //: getAllPets
  const allPets = await prisma.pet.findMany({
    where: conditions.length > 0 ? { AND: conditions } : {},
    take,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  //: Total Count
  const total = await prisma.pet.count({
    where: conditions.length > 0 ? { AND: conditions } : {},
  });

  return {
    meta: {
      page,
      limit: take,
      total,
    },
    data: allPets,
  };
};

//! Update Pet Profile By Id
const updatePetProfileById = async (petId: string, payLoad: Partial<Pet>) => {
  //:check if pet exists
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });
  if (!pet) {
    throw new AppError("Pet not found", 404);
  }
  //:update Pet Profile
  const updatedPet = await prisma.pet.update({
    where: {
      id: petId,
    },
    data: payLoad,
  });

  return updatedPet;
};

export const petService = {
  createPetToDB,
  getAllPetsFromDB,
  updatePetProfileById,
};
