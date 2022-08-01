import { Request, Response } from "express";
import { FindSpotType } from "./../schemas/spot.schema";
import { findSpot, getSpots } from "./../services/spot.service";

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
