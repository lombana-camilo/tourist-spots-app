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
spots.get("/:spotId", validateRequest(findSpotSchema), findSpotHandler);
spots.post(
  "/",
  [requireUser, validateRequest(createSpotSchema)],
  createSpotHandler
);
spots.put(
  "/:spotId",
  [requireUser, validateRequest(updateSpotSchema)],
  updateSpotHandler
);
spots.delete(
  "/:spotId",
  [requireUser, validateRequest(deleteSpotSchema)],
  deleteSpotHandler
);

//Reviews
spots.use("/:spotId/reviews", reviews);
export default spots;
