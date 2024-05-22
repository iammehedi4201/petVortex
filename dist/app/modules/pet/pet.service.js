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
exports.petService = void 0;
const prisma_1 = __importDefault(require("../../../Shared/prisma"));
const filterHelper_1 = __importDefault(require("../../../helper/filterHelper"));
const paginationHelper_1 = __importDefault(require("../../../helper/paginationHelper"));
const appError_1 = __importDefault(require("../../../helper/errorHelper/appError"));
//! Create Pet To DB
const createPetToDB = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    //: createPet
    const newPet = yield prisma_1.default.pet.create({
        data: payLoad,
    });
    return newPet;
});
//! Get All Pets From DB
const getAllPetsFromDB = (filterOptions, options) => __awaiter(void 0, void 0, void 0, function* () {
    //:Filter Conditions
    const conditions = (0, filterHelper_1.default)(filterOptions);
    const { page, take, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(options);
    //: getAllPets
    const allPets = yield prisma_1.default.pet.findMany({
        where: conditions.length > 0 ? { AND: conditions } : {},
        take,
        skip,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    //: Total Count
    const total = yield prisma_1.default.pet.count({
        where: conditions.length > 0 ? { AND: conditions } : {},
    });
    return {
        meta: {
            page,
            limit: take,
            total,
        },
        data: allPets,
    };
});
//! Update Pet Profile By Id
const updatePetProfileById = (petId, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    //:check if pet exists
    const pet = yield prisma_1.default.pet.findUnique({
        where: {
            id: petId,
        },
    });
    if (!pet) {
        throw new appError_1.default("Pet not found", 404);
    }
    //:update Pet Profile
    const updatedPet = yield prisma_1.default.pet.update({
        where: {
            id: petId,
        },
        data: payLoad,
    });
    return updatedPet;
});
exports.petService = {
    createPetToDB,
    getAllPetsFromDB,
    updatePetProfileById,
};
