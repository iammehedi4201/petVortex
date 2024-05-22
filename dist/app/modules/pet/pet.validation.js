"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createPetValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string(),
        species: zod_1.default.string(),
        breed: zod_1.default.string(),
        age: zod_1.default.number().int(),
        size: zod_1.default.string(),
        location: zod_1.default.string(),
        description: zod_1.default.string(),
        temperament: zod_1.default.string(),
        medicalHistory: zod_1.default.string(),
        adoptionRequirements: zod_1.default.string(),
    }),
});
const updatePetValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        species: zod_1.default.string().optional(),
        breed: zod_1.default.string().optional(),
        age: zod_1.default.number().int().optional(),
        size: zod_1.default.string().optional(),
        location: zod_1.default.string().optional(),
        description: zod_1.default.string().optional(),
        temperament: zod_1.default.string().optional(),
        medicalHistory: zod_1.default.string().optional(),
        adoptionRequirements: zod_1.default.string().optional(),
    }),
});
exports.petValidation = {
    createPetValidationSchema,
    updatePetValidationSchema,
};
