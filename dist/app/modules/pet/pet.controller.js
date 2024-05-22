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
exports.petController = void 0;
const Pick_1 = __importDefault(require("../../../Shared/Pick"));
const catchAynsc_1 = __importDefault(require("../../../Shared/catchAynsc"));
const sendResponse_1 = __importDefault(require("../../../Shared/sendResponse"));
const constants_1 = require("../../constants/constants");
const pet_constant_1 = require("./pet.constant");
const pet_service_1 = require("./pet.service");
//! Create Pet To DB
const createPetToDB = (0, catchAynsc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pet_service_1.petService.createPetToDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Pet added successfully",
        data: result,
    });
}));
//! Get All Pets
const getAllPetsFromDB = (0, catchAynsc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, Pick_1.default)(req.query, pet_constant_1.petFilterAbleFields);
    const options = (0, Pick_1.default)(req.query, constants_1.optionsFields);
    const result = yield pet_service_1.petService.getAllPetsFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Pets retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
}));
//! update pet profile by id
const updatePetProfileById = (0, catchAynsc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = req.params;
    const result = yield pet_service_1.petService.updatePetProfileById(petId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Pet profile updated successfully",
        data: result,
    });
}));
exports.petController = {
    createPetToDB,
    getAllPetsFromDB,
    updatePetProfileById,
};
