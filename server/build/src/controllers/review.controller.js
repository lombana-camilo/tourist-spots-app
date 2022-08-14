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
exports.deleteReviewHandler = exports.createReviewHandler = void 0;
const lodash_1 = require("lodash");
const mongoose_1 = __importDefault(require("mongoose"));
const review_model_1 = __importDefault(require("./../models/review.model"));
const spot_model_1 = __importDefault(require("./../models/spot.model"));
const review_service_1 = require("./../services/review.service");
const createReviewHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating, comment } = req.body;
        const { spotId } = req.params;
        const userId = res.locals.user._id;
        const spotObjectId = new mongoose_1.default.Types.ObjectId(spotId);
        const spot = yield spot_model_1.default.findById(spotId);
        if (!spot) {
            return res.sendStatus(404);
        }
        let review = yield (0, review_service_1.createReview)({
            user: userId,
            rating,
            comment,
            spotId: spotObjectId,
        });
        review = yield review.populate("user");
        spot.reviews.push(review);
        yield spot.save();
        return res.send(review);
    }
    catch (e) {
        return res.sendStatus(404);
    }
});
exports.createReviewHandler = createReviewHandler;
const deleteReviewHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user._id;
        const { spotId, reviewId } = req.params;
        const review = yield review_model_1.default.findById(reviewId);
        if (!review) {
            return res.sendStatus(404);
        }
        console.log("review.user", (0, lodash_1.get)(review.user, "_id").toString());
        console.log("sessionUserId", userId);
        if ((0, lodash_1.get)(review.user, "_id").toString() !== userId) {
            return res
                .status(403)
                .send("You do not have permission to delete this review!");
        }
        yield spot_model_1.default.findByIdAndUpdate(spotId, { $pull: { reviews: reviewId } });
        const deleted = yield (0, review_service_1.deleteReview)({ _id: reviewId });
        return res.send(deleted);
    }
    catch (e) {
        return res.sendStatus(400);
    }
});
exports.deleteReviewHandler = deleteReviewHandler;
