import { Router } from "express";
import validateRequest from "./../middleware/validateRequest";
import { createSpotSchema, findSpotSchema, updateSpotSchema } from "./../schemas/spot.schema";
import { createSpotHandler, findSpotHandler, getSpotsHandler, updateSpotHandler } from "./../controllers/spot.controller";

const spots = Router()

spots.get("/",getSpotsHandler)
spots.get("/:spotId",validateRequest(findSpotSchema), findSpotHandler)
spots.post("/",validateRequest(createSpotSchema), createSpotHandler)
spots.put("/:spotId",validateRequest(updateSpotSchema), updateSpotHandler)

export default spots
