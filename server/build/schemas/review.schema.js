"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewsSchema = exports.createReviewSchema = void 0;
const zod_1 = require("zod");
exports.createReviewSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        rating: (0, zod_1.number)().gte(0).lte(5),
        comment: (0, zod_1.string)().min(1, "Comment is required"),
    }),
    params: (0, zod_1.object)({
        spotId: (0, zod_1.string)().min(1, "spot Id is required"),
    }),
});
exports.deleteReviewsSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        spotId: (0, zod_1.string)().min(1, "spot Id is required"),
        reviewId: (0, zod_1.string)().min(1, "Review Id is required"),
    }),
});
