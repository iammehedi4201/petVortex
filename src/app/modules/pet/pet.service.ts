import { Pet } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import AppError from "../../../helper/errorHelper/appError";
import createFilterConditions from "../../../helper/filterHelper";
import generatePaginationAndSortOptions from "../../../helper/paginationHelper";
import { Toptions } from "../../interfaces/paginationAndSortOptions";
import { TPetPayload } from "./pet.interface";

//! Create Pet To DB
const createPetToDB = async (payLoad: TPetPayload) => {
  const { pet, images } = payLoad;
  const result = await prisma.$transaction(async (transactionClient) => {
    //: createPet
    const newPet = await transactionClient.pet.create({
      data: pet,
    });

    console.log("newPet", newPet);

    //: createPetImages
    const petImages = images.map((image) => ({
      petId: newPet.id,
      url: image,
    }));

    await transactionClient.petImages.createMany({
      data: petImages,
    });
    return newPet;
  });

  return result;
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
    include: {
      PetImages: {
        select: {
          url: true,
        },
      },
    },
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

//! Get Pet By Id
const getPetByIdFromDB = async (petId: string) => {
  //: check if pet exists
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
      isDeleted: false,
    },
    include: {
      PetImages: {
        select: {
          url: true,
        },
      },
    },
  });

  if (!pet) {
    throw new AppError("Pet not found", 404);
  }

  return pet;
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

const deletePetById = async (petId: string) => {
  //:check if pet exists
  const isPetExists = await prisma.pet.findUnique({
    where: {
      id: petId,
      isDeleted: false,
    },
  });

  if (!isPetExists) {
    throw new AppError("Pet not found", 404);
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    //:deletePet
    const deletePet = await transactionClient.pet.update({
      where: {
        id: petId,
      },
      data: {
        isDeleted: true,
      },
    });

    //:deletePetImages
    await transactionClient.petImages.updateMany({
      where: {
        id: petId,
      },
      data: {
        isDeleted: true,
      },
    });

    return deletePet;
  });

  return result;
};

export const petService = {
  createPetToDB,
  getAllPetsFromDB,
  getPetByIdFromDB,
  updatePetProfileById,
  deletePetById,
};
