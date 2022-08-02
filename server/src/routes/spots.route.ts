import { Router } from "express";
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

export default spots;
