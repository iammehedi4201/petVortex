import pick from "../../../Shared/Pick";
import catchAsync from "../../../Shared/catchAynsc";
import sendResponse from "../../../Shared/sendResponse";
import { optionsFields } from "../../constants/constants";
import { petFilterAbleFields } from "./pet.constant";
import { petService } from "./pet.service";

//! Create Pet To DB
const createPetToDB = catchAsync(async (req, res) => {
  const result = await petService.createPetToDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Pet added successfully",
    data: result,
  });
});

//! Get All Pets
const getAllPetsFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, petFilterAbleFields);
  const options = pick(req.query, optionsFields);
  const result = await petService.getAllPetsFromDB(filters, options as any);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Pets retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

//! update pet profile by id
const updatePetProfileById = catchAsync(async (req, res) => {
  const { petId } = req.params;
  const result = await petService.updatePetProfileById(petId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Pet profile updated successfully",
    data: result,
  });
});

//! delete pet by id
const deletePetById = catchAsync(async (req, res) => {
  const { petId } = req.params;
  const result = await petService.deletePetById(petId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Pet deleted successfully",
    data: result,
  });
});

export const petController = {
  createPetToDB,
  getAllPetsFromDB,
  updatePetProfileById,
  deletePetById,
};
