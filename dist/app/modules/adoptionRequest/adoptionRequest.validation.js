"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const CreateAdoptionRequestValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        petId: zod_1.default.string(),
        petOwnershipExperience: zod_1.default.string(),
    }),
});
const updateAdoptionRequestStatusValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        status: zod_1.default.enum(Object.values(client_1.Status)),
    }),
});
exports.adoptionRequestValidation = {
    CreateAdoptionRequestValidationSchema,
    updateAdoptionRequestStatusValidationSchema,
};
