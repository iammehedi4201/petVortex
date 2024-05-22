import { AdoptionRequest } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import AppError from "../../../helper/errorHelper/appError";
import { TJWTPayload } from "../auth/auth.interface";

//! create Adoption Request
const createAdoptionRequestToDB = async (
  user: TJWTPayload,
  payLoad: TPayLoad
) => {
  const { petId, petOwnershipExperience } = payLoad;

  //: check if pet exists
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });

  if (!pet) {
    throw new AppError("Pet not found", 404);
  }

  //: create adoption request
  const adoptionRequest = await prisma.adoptionRequest.create({
    data: {
      petId,
      userId: user.id,
      petOwnershipExperience,
    },
  });
  return adoptionRequest;
};

//! get Adoption Request
const getAdoptionRequestFromDB = async () => {
  const adoptionRequests = await prisma.adoptionRequest.findMany({});
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

export const adoptionRequestService = {
  createAdoptionRequestToDB,
  getAdoptionRequestFromDB,
  updateAdoptionRequestStatus,
};
