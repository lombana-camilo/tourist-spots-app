import { Request, Response, Router, Express } from "express";
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

// File Upload

import multer from "multer";
import { storage } from "./../utils/cloudinary";
const upload = multer({ storage: storage });

spots.get("/all", getSpotsHandler);
spots
  .route("/:spotId")
  .get(validateRequest(findSpotSchema), findSpotHandler)
  .put([requireUser,upload.array("images") ], updateSpotHandler)
  .delete([requireUser, validateRequest(deleteSpotSchema)], deleteSpotHandler);


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname,"./../uploads"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

spots.post(
  "/",
  [requireUser, upload.array("images"), validateRequest(createSpotSchema)],
  createSpotHandler
);

//Reviews
spots.use("/:spotId/reviews", reviews);
export default spots;
