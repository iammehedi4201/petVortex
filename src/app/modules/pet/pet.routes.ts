import express from "express";
import ValidateRequest from "../../middlewares/validateRequest";
import { petValidation } from "./pet.validation";
import { petController } from "./pet.controller";
import checkAuth from "../../middlewares/checkAuth";

const router = express.Router();

//! Create Pet
router.post(
  "/",
  checkAuth("ADMIN"),
  ValidateRequest(petValidation.createPetValidationSchema),
  petController.createPetToDB
);

//! Get All Pets
router.get("/", petController.getAllPetsFromDB);

//! Get Pet By Id
router.get("/:petId", petController.getPetByIdFromDB);

//! Update Pet profile By Id
router.put(
  "/:petId",
  checkAuth("ADMIN"),
  ValidateRequest(petValidation.updatePetValidationSchema),
  petController.updatePetProfileById
);

//! Delete pet By Id
router.delete("/:petId", checkAuth("ADMIN"), petController.deletePetById);

export const petRoutes = router;
