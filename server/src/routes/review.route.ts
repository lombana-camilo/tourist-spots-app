import { Router } from "express";
import validateRequest from "./../middleware/validateRequest";
import {
  createReviewSchema,
  deleteReviewsSchema,
} from "./../schemas/review.schema";
import {
  createReviewHandler,
  deleteReviewHandler,
} from "./../controllers/review.controller";
import requireUser from "./../middleware/requireUser";

const reviews = Router({ mergeParams: true });

reviews.post(
  "/",
  [requireUser, validateRequest(createReviewSchema)],
  createReviewHandler
);
reviews.delete(
  "/:reviewId",
  [requireUser, validateRequest(deleteReviewsSchema)],
  deleteReviewHandler
);

export default reviews;
