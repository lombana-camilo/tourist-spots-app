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
  const spots = await getSpots();

  if (!spots) {
    return res.sendStatus(404);
  }
  return res.send(spots);
};

export const findSpotHandler = async (
  req: Request<FindSpotType["params"]>,
  res: Response
) => {
   console.log("enter handler")
  const spot = await findSpot({ _id: req.params.spotId });
  if (!spot) {
    return res.sendStatus(404);
  }

  return res.send(spot);
};

export const createSpotHandler = async (
  req: Request<{}, {}, CreateSpotType["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const newSpot = await createSpot({ ...req.body, user: userId });
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
    return res.sendStatus(403);
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
    return res.sendStatus(403);
  }
  //Update spot data
  await deleteSpot({_id:spotId});
  return res.sendStatus(200);
};
