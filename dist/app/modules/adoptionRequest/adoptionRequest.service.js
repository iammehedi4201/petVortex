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
exports.adoptionRequestService = void 0;
const prisma_1 = __importDefault(require("../../../Shared/prisma"));
const appError_1 = __importDefault(require("../../../helper/errorHelper/appError"));
//! create Adoption Request
const createAdoptionRequestToDB = (user, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId, petOwnershipExperience } = payLoad;
    //: check if pet exists
    const pet = yield prisma_1.default.pet.findUnique({
        where: {
            id: petId,
        },
    });
    if (!pet) {
        throw new appError_1.default("Pet not found", 404);
    }
    //: create adoption request
    const adoptionRequest = yield prisma_1.default.adoptionRequest.create({
        data: {
            petId,
            userId: user.id,
            petOwnershipExperience,
        },
    });
    return adoptionRequest;
});
//! get Adoption Request
const getAdoptionRequestFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const adoptionRequests = yield prisma_1.default.adoptionRequest.findMany({});
    return adoptionRequests;
});
//! update Adoption Request status
const updateAdoptionRequestStatus = (adoptionRequestId, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    //: check if adoption request exists
    const adoptionRequest = yield prisma_1.default.adoptionRequest.findUnique({
        where: {
            id: adoptionRequestId,
        },
    });
    if (!adoptionRequest) {
        throw new appError_1.default("Adoption request not found", 404);
    }
    const updatedAdoptionRequest = yield prisma_1.default.adoptionRequest.update({
        where: {
            id: adoptionRequestId,
        },
        data: {
            status: payLoad.status,
        },
    });
    return updatedAdoptionRequest;
});
exports.adoptionRequestService = {
    createAdoptionRequestToDB,
    getAdoptionRequestFromDB,
    updateAdoptionRequestStatus,
};
