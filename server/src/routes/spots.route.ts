import { Router } from "express";
import { getSpotsHandler } from "./../controllers/spot.controller";

const spots = Router()

spots.get("/",getSpotsHandler)

export default spots
