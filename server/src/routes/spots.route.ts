import { Router } from "express";
import validateRequest from "./../middleware/validateRequest";
import { findSpotSchema } from "./../schemas/spot.schema";
import { findSpotHandler, getSpotsHandler } from "./../controllers/spot.controller";

const spots = Router()

spots.get("/",getSpotsHandler)
spots.get("/:spotId",validateRequest(findSpotSchema), findSpotHandler)

export default spots
