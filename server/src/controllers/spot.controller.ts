import { Request, Response } from "express";
import {
  CreateSpotType,
  FindSpotType,
  UpdateSpotType,
} from "./../schemas/spot.schema";
import {
  createSpot,
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
  const newSpot = await createSpot(req.body);
  return res.send(newSpot);
};

export const updateSpotHandler = async (
  req: Request<UpdateSpotType["params"], {}, UpdateSpotType["body"]>,
  res: Response
) => {
  //Find Spot to update
  const spotId = req.params.spotId;
  const spot = await findSpot({ _id: spotId });
  if (!spot) {
    return res.sendStatus(404);
  }

  //USER CONTROL!!!
  // if (product.user?.toString() !== userId) {
  // return res.sendStatus(403);

  //Update spot data
  const updated = await updateSpot({ _id: spotId }, req.body, { new: true });
  return res.send(updated);
};
