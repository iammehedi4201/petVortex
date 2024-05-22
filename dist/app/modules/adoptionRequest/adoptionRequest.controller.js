"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestController = void 0;
const catchAynsc_1 = __importDefault(require("../../../Shared/catchAynsc"));
const sendResponse_1 = __importDefault(require("../../../Shared/sendResponse"));
const adoptionRequest_service_1 = require("./adoptionRequest.service");
//! Create Adoption Request
const createAdoptionRequestToDB = (0, catchAynsc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield adoptionRequest_service_1.adoptionRequestService.createAdoptionRequestToDB(user, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Adoption request submitted successfully",
        data: result,
    });
}));
//! Get Adoption Request
const getAdoptionRequestFromDB = (0, catchAynsc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adoptionRequest_service_1.adoptionRequestService.getAdoptionRequestFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Adoption requests retrieved successfully",
        data: result,
    });
}));
//! update Adoption Request status
const updateAdoptionRequestStatus = (0, catchAynsc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const result = yield adoptionRequest_service_1.adoptionRequestService.updateAdoptionRequestStatus(requestId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Adoption request status updated successfully",
        data: result,
    });
}));
exports.adoptionRequestController = {
    createAdoptionRequestToDB,
    getAdoptionRequestFromDB,
    updateAdoptionRequestStatus,
};
