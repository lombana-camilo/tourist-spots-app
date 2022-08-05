import { Router } from "express";
import validateRequest from "./../middleware/validateRequest";
import { createReviewSchema, getSpotReviewsSchema } from "./../schemas/review.schema";
import { createReviewHandler } from "./../controllers/review.controller";

const reviews = Router()

reviews.post("/:spot",validateRequest(createReviewSchema), createReviewHandler)
// reviews.get("/:spot",validateRequest(getSpotReviewsSchema), getSpotReviewsHandler)

export default reviews
