import express from "express";
import ValidateRequest from "../../middlewares/validateRequest";
import { petValidation } from "./pet.validation";
import { petController } from "./pet.controller";
import checkAuth from "../../middlewares/checkAuth";

const router = express.Router();

//! Create Pet
router.post(
  "/",
  checkAuth(),
  ValidateRequest(petValidation.createPetValidationSchema),
  petController.createPetToDB
);

//! Get All Pets
router.get("/", petController.getAllPetsFromDB);

//! Update Pet profile By Id
router.put(
  "/:petId",
  checkAuth(),
  ValidateRequest(petValidation.updatePetValidationSchema),
  petController.updatePetProfileById
);

export const petRoutes = router;
