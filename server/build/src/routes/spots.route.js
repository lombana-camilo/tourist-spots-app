"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("./../middleware/validateRequest"));
const spot_schema_1 = require("./../schemas/spot.schema");
const spot_controller_1 = require("./../controllers/spot.controller");
const requireUser_1 = __importDefault(require("./../middleware/requireUser"));
const review_route_1 = __importDefault(require("./review.route"));
const spots = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("./../utils/cloudinary");
const upload = (0, multer_1.default)({ storage: cloudinary_1.storage });
spots.get("/all", spot_controller_1.getSpotsHandler);
spots
    .route("/:spotId")
    .get((0, validateRequest_1.default)(spot_schema_1.findSpotSchema), spot_controller_1.findSpotHandler)
    .put([requireUser_1.default, upload.array("images"), (0, validateRequest_1.default)(spot_schema_1.updateSpotSchema)], spot_controller_1.updateSpotHandler)
    .delete([requireUser_1.default, (0, validateRequest_1.default)(spot_schema_1.deleteSpotSchema)], spot_controller_1.deleteSpotHandler);
spots.post("/", [requireUser_1.default, upload.array("images"), (0, validateRequest_1.default)(spot_schema_1.createSpotSchema)], spot_controller_1.createSpotHandler);
spots.use("/:spotId/reviews", review_route_1.default);
exports.default = spots;
