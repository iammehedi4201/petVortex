import express from "express";
import { adoptionRequestController } from "./adoptionRequest.controller";
import checkAuth from "../../middlewares/checkAuth";
import ValidateRequest from "../../middlewares/validateRequest";
import { adoptionRequestValidation } from "./adoptionRequest.validation";

const router = express.Router();

//! Create Adoption Request
router.post(
  "/",
  checkAuth(),
  ValidateRequest(
    adoptionRequestValidation.CreateAdoptionRequestValidationSchema
  ),
  adoptionRequestController.createAdoptionRequestToDB
);

//! Get Adoption Request
router.get(
  "/",
  checkAuth(),
  adoptionRequestController.getAdoptionRequestFromDB
);

//! update Adoption Request status
router.put(
  "/:requestId",
  checkAuth(),
  ValidateRequest(
    adoptionRequestValidation.updateAdoptionRequestStatusValidationSchema
  ),
  adoptionRequestController.updateAdoptionRequestStatus
);

export const adoptionRequestRoutes = router;
