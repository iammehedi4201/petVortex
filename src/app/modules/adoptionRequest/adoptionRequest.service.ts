import { AdoptionRequest } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import AppError from "../../../helper/errorHelper/appError";
import { TJWTPayload } from "../auth/auth.interface";

//! create Adoption Request
const createAdoptionRequestToDB = async (
  user: TJWTPayload,
  payLoad: TPayLoad
) => {
  const { petId, address, city, state, zipCode } = payLoad;

  //: check if pet exists
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
      isDeleted: false,
    },
  });

  if (!pet) {
    throw new AppError("Pet not found", 404);
  }

  //: create adoption request
  const adoptionRequest = await prisma.adoptionRequest.create({
    data: {
      petId,
      userId: user?.id,
      address: payLoad?.address,
      city: payLoad?.city,
      state: payLoad?.state,
      zipCode: payLoad?.zipCode,
    },
  });
  return adoptionRequest;
};

//! get Adoption Request
const getAdoptionRequestFromDB = async () => {
  const adoptionRequests = await prisma.adoptionRequest.findMany({
    select: {
      id: true,
      createdAt: true,
      status: true,
      address: true,
      user: {
        select: {
          name: true,
          email: true,
          contactNo: true,
        },
      },
      pet: {
        select: {
          name: true,
          age: true,
          species: true,
          PetImages: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  });
  return adoptionRequests;
};

//! update Adoption Request status
const updateAdoptionRequestStatus = async (
  adoptionRequestId: string,
  payLoad: Partial<AdoptionRequest>
) => {
  //: check if adoption request exists
  const adoptionRequest = await prisma.adoptionRequest.findUnique({
    where: {
      id: adoptionRequestId,
    },
  });

  if (!adoptionRequest) {
    throw new AppError("Adoption request not found", 404);
  }

  const updatedAdoptionRequest = await prisma.adoptionRequest.update({
    where: {
      id: adoptionRequestId,
    },
    data: {
      status: payLoad.status,
    },
  });

  return updatedAdoptionRequest;
};

//! get Adoption Request by user
const getAdoptionRequestByUser = async (user: TJWTPayload) => {
  const { id, email } = user;
  //: check if user exists
  const userExists = await prisma.user.findUnique({
    where: {
      id,
      status: "ACTIVE",
    },
  });

  if (!userExists) {
    throw new AppError("User not found", 404);
  }

  const adoptionRequests = await prisma.adoptionRequest.findMany({
    where: {
      userId: id,
    },
    select: {
      createdAt: true,
      status: true,
      pet: {
        select: {
          name: true,
          age: true,
          species: true,
          PetImages: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  });

  return adoptionRequests;
};

export const adoptionRequestService = {
  createAdoptionRequestToDB,
  getAdoptionRequestFromDB,
  updateAdoptionRequestStatus,
  getAdoptionRequestByUser,
};
