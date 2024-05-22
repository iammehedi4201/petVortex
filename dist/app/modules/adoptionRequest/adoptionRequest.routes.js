"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const adoptionRequest_controller_1 = require("./adoptionRequest.controller");
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const adoptionRequest_validation_1 = require("./adoptionRequest.validation");
const router = express_1.default.Router();
//! Create Adoption Request
router.post("/", (0, checkAuth_1.default)(), (0, validateRequest_1.default)(adoptionRequest_validation_1.adoptionRequestValidation.CreateAdoptionRequestValidationSchema), adoptionRequest_controller_1.adoptionRequestController.createAdoptionRequestToDB);
//! Get Adoption Request
router.get("/", (0, checkAuth_1.default)(), adoptionRequest_controller_1.adoptionRequestController.getAdoptionRequestFromDB);
//! update Adoption Request status
router.put("/:requestId", (0, checkAuth_1.default)(), (0, validateRequest_1.default)(adoptionRequest_validation_1.adoptionRequestValidation.updateAdoptionRequestStatusValidationSchema), adoptionRequest_controller_1.adoptionRequestController.updateAdoptionRequestStatus);
exports.adoptionRequestRoutes = router;
