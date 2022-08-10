import console from "console";
import { Request, Response } from "express";
import { get } from "lodash";
import ReviewModel from "./../models/review.model";
import {
  CreateSpotType,
  DeleteSpotType,
  FindSpotType,
  UpdateSpotType,
} from "./../schemas/spot.schema";
import {
  createSpot,
  deleteSpot,
  findSpot,
  getSpots,
  updateSpot,
} from "./../services/spot.service";

export const getSpotsHandler = async (_: Request, res: Response) => {
  try {
    const spots = await getSpots();
    return res.send(spots);
  } catch (e) {
    return res.sendStatus(404);
  }
};

export const findSpotHandler = async (
  req: Request<FindSpotType["params"]>,
  res: Response
) => {
  try {
    const spot = await findSpot({ _id: req.params.spotId });
    return res.send(spot);
  } catch (e) {
    return res.sendStatus(404);
  }
};

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}
export const createSpotHandler = async (
  req: Request<{}, {}, CreateSpotType["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  if (req.files && !req.files.length) {
    return res.sendStatus(400);
  }
  const multerFiles = (req as MulterRequest).files;
  // console.log({ multerFiles });
  const images = multerFiles.map((file) => {
    return { url: file.path, filename: file.filename };
  });
  const newSpot = await createSpot({
    ...req.body,
    images,
    user: userId,
    reviews: [],
  });
  return res.send(newSpot);
};

export const updateSpotHandler = async (
  req: Request<UpdateSpotType["params"], {}, UpdateSpotType["body"]>,
  res: Response
) => {

  if (req.files && !req.files.length) {
    return res.sendStatus(400);
  }
  const multerFiles = (req as MulterRequest).files;
   console.log("body",req.body)
  console.log({ multerFiles });
  //Get user _id
  const userId = res.locals.user._id;
  //Find Spot to update
  const spotId = req.params.spotId;
  const spot = await findSpot({ _id: spotId });
  if (!spot) {
    return res.sendStatus(404);
  }
  // Ownership constrol
  if (get(spot.user, "_id").toString() !== userId) {
    return res
      .status(403)
      .send("You do not have permission to update this spot!");
  }
  //Update spot data
  const newImages = multerFiles.map((file) => {
    return { url: file.path, filename: file.filename };
  });
  const updated = await updateSpot({ _id: spotId }, req.body, { new: true });
   updated?.images.push(...newImages)
   updated?.save()
  return res.send(updated);
};

export const deleteSpotHandler = async (
  req: Request<DeleteSpotType["params"]>,
  res: Response
) => {
  //Find user _id
  const userId = res.locals.user._id;
  //Find Spot to delete
  const spotId = req.params.spotId;
  const spot = await findSpot({ _id: spotId });
  if (!spot) {
    return res.sendStatus(404);
  }

  // Ownership constrol
  if (get(spot.user, "_id").toString() !== userId) {
    return res
      .status(403)
      .send("You do not have permission to delete this spot!");
  }
  //Delete spot
  const deleted = await deleteSpot({ _id: spotId });

  //Delete Reviews' associations
  await ReviewModel.deleteMany({ spotId });
  return res.send(deleted);
};
