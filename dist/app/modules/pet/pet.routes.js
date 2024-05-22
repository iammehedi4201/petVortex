"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const pet_validation_1 = require("./pet.validation");
const pet_controller_1 = require("./pet.controller");
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const router = express_1.default.Router();
//! Create Pet
router.post("/", (0, checkAuth_1.default)(), (0, validateRequest_1.default)(pet_validation_1.petValidation.createPetValidationSchema), pet_controller_1.petController.createPetToDB);
//! Get All Pets
router.get("/", pet_controller_1.petController.getAllPetsFromDB);
//! Update Pet profile By Id
router.put("/:petId", (0, checkAuth_1.default)(), (0, validateRequest_1.default)(pet_validation_1.petValidation.updatePetValidationSchema), pet_controller_1.petController.updatePetProfileById);
exports.petRoutes = router;
