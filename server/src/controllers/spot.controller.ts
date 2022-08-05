import { Request, Response } from "express";
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

export const createSpotHandler = async (
  req: Request<{}, {}, CreateSpotType["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const newSpot = await createSpot({ ...req.body, user: userId,reviews:[] });
   console.log("newSpot",await newSpot.populate("user"))
  return res.send(newSpot);
};

export const updateSpotHandler = async (
  req: Request<UpdateSpotType["params"], {}, UpdateSpotType["body"]>,
  res: Response
) => {
  //Find user _id
  const userId = res.locals.user._id;
  //Find Spot to update
  const spotId = req.params.spotId;
  const spot = await findSpot({ _id: spotId });
  if (!spot) {
    return res.sendStatus(404);
  }

  // Ownership constrol
  if (spot.user?.toString() !== userId) {
    return res
      .status(403)
      .send("You do not have permission to update this spot!");
  }
  //Update spot data
  const updated = await updateSpot({ _id: spotId }, req.body, { new: true });
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
  if (spot.user?.toString() !== userId) {
    return res
      .status(403)
      .send("You do not have permission to delete this spot!");
  }
  //Update spot data
  const deleted = await deleteSpot({ _id: spotId });
  return res.send(deleted);
};
