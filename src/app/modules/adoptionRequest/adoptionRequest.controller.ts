import catchAsync from "../../../Shared/catchAynsc";
import sendResponse from "../../../Shared/sendResponse";
import { adoptionRequestService } from "./adoptionRequest.service";

//! Create Adoption Request
const createAdoptionRequestToDB = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await adoptionRequestService.createAdoptionRequestToDB(
    user!,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Adoption request submitted successfully",
    data: result,
  });
});

//! Get Adoption Request
const getAdoptionRequestFromDB = catchAsync(async (req, res) => {
  const result = await adoptionRequestService.getAdoptionRequestFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

//! update Adoption Request status
const updateAdoptionRequestStatus = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const result = await adoptionRequestService.updateAdoptionRequestStatus(
    requestId,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Adoption request status updated successfully",
    data: result,
  });
});

//! get Adoption Request by user
const getAdoptionRequestByUser = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await adoptionRequestService.getAdoptionRequestByUser(user!);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

export const adoptionRequestController = {
  createAdoptionRequestToDB,
  getAdoptionRequestFromDB,
  updateAdoptionRequestStatus,
  getAdoptionRequestByUser,
};
