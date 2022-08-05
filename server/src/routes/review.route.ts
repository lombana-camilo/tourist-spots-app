import { Router } from "express";
import validateRequest from "./../middleware/validateRequest";
import {
  createReviewSchema,
  deleteReviewsSchema,
} from "./../schemas/review.schema";
import { createReviewHandler, deleteReviewHandler } from "./../controllers/review.controller";

const reviews = Router({ mergeParams: true });

reviews.post("/", validateRequest(createReviewSchema), createReviewHandler);
reviews.delete("/:reviewId", validateRequest(deleteReviewsSchema), deleteReviewHandler);

export default reviews;
