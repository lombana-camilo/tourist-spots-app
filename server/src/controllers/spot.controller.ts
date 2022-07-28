import { Request, Response } from "express";
import { getSpots } from "./../services/spot.service";

export const getSpotsHandler = async (_: Request, res: Response) => {
  const spots = await getSpots();

  if (!spots) {
    return res.sendStatus(404);
  }
  return res.send(spots);
};
