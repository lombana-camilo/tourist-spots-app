"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("./../middleware/validateRequest"));
const review_schema_1 = require("./../schemas/review.schema");
const review_controller_1 = require("./../controllers/review.controller");
const requireUser_1 = __importDefault(require("./../middleware/requireUser"));
const reviews = (0, express_1.Router)({ mergeParams: true });
reviews.post("/", [requireUser_1.default, (0, validateRequest_1.default)(review_schema_1.createReviewSchema)], review_controller_1.createReviewHandler);
reviews.delete("/:reviewId", [requireUser_1.default, (0, validateRequest_1.default)(review_schema_1.deleteReviewsSchema)], review_controller_1.deleteReviewHandler);
exports.default = reviews;
//# sourceMappingURL=review.route.js.map