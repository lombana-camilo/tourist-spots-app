import { Router } from "express";
import validateRequest from "./../middleware/validateRequest";
import { createSpotSchema, findSpotSchema } from "./../schemas/spot.schema";
import { createSpotHandler, findSpotHandler, getSpotsHandler } from "./../controllers/spot.controller";

const spots = Router()

spots.get("/",getSpotsHandler)
spots.get("/:spotId",validateRequest(findSpotSchema), findSpotHandler)
spots.post("/",validateRequest(createSpotSchema), createSpotHandler)

export default spots
