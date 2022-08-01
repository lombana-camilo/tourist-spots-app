import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import SpotModel, { Spot } from "./../models/spot.model";

export const getSpots = async () => {
  return await SpotModel.find({});
};

export const findSpot = async (query: FilterQuery<Spot>) => {
  return await SpotModel.findOne(query, {}, { lean: true });
};

export const createSpot = async (spot: Spot) => {
  return await SpotModel.create(spot);
};

export const updateSpot = async (
  query: FilterQuery<Spot>,
  update: UpdateQuery<Spot>,
  options: QueryOptions
) => {
  return await SpotModel.findOneAndUpdate(query, update, options);
};
