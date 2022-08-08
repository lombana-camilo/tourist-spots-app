import { Request, Router } from "express";
import validateRequest from "./../middleware/validateRequest";
import {
  createSpotSchema,
  deleteSpotSchema,
  findSpotSchema,
  updateSpotSchema,
} from "./../schemas/spot.schema";
import {
  createSpotHandler,
  deleteSpotHandler,
  findSpotHandler,
  getSpotsHandler,
  updateSpotHandler,
} from "./../controllers/spot.controller";
import requireUser from "./../middleware/requireUser";
import reviews from "./review.route";

const spots = Router();

spots.get("/all", getSpotsHandler);
spots
  .route("/:spotId")
  .get(validateRequest(findSpotSchema), findSpotHandler)
  .put([requireUser, validateRequest(updateSpotSchema)], updateSpotHandler)
  .delete([requireUser, validateRequest(deleteSpotSchema)], deleteSpotHandler);

spots.post(
  "/",
  [requireUser, validateRequest(createSpotSchema)],
  createSpotHandler
);

//Reviews
spots.use("/:spotId/reviews", reviews);
export default spots;
