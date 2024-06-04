import express from "express";
import { adoptionRequestController } from "./adoptionRequest.controller";
import checkAuth from "../../middlewares/checkAuth";
import ValidateRequest from "../../middlewares/validateRequest";
import { adoptionRequestValidation } from "./adoptionRequest.validation";

const router = express.Router();

//! Create Adoption Request
router.post(
  "/",
  checkAuth("ADMIN", "USER"),
  ValidateRequest(
    adoptionRequestValidation.CreateAdoptionRequestValidationSchema
  ),
  adoptionRequestController.createAdoptionRequestToDB
);

//! Get Adoption Request
router.get(
  "/",
  checkAuth("ADMIN"),
  adoptionRequestController.getAdoptionRequestFromDB
);

//! update Adoption Request status
router.put(
  "/:requestId",
  checkAuth("ADMIN"),
  // ValidateRequest(
  //   adoptionRequestValidation.updateAdoptionRequestStatusValidationSchema
  // ),
  adoptionRequestController.updateAdoptionRequestStatus
);

//! get Adoption Request by user
router.get(
  "/user",
  checkAuth("ADMIN", "USER"),
  adoptionRequestController.getAdoptionRequestByUser
);

export const adoptionRequestRoutes = router;
