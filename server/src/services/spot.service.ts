import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import SpotModel, { Spot } from "./../models/spot.model";

export const getSpots = async () => {
  return await SpotModel.find({});
};

export const findSpot = async (query: FilterQuery<Spot>) => {
  try {
    return await SpotModel.findOne(query)
      .populate({path:"reviews",populate:{path: "user" }})
      .populate("user");
  } catch (e) {
    throw new Error(e);
  }
};

export const createSpot = async (spot: Omit<Spot,"thumbnail">) => {
  return await SpotModel.create(spot);
};

export const updateSpot = async (
  query: FilterQuery<Spot>,
  update: UpdateQuery<Spot>,
  options: QueryOptions
) => {
  return await SpotModel.findOneAndUpdate(query, update, options);
};

export const deleteSpot = async (query: FilterQuery<Spot>) => {
  return await SpotModel.deleteOne(query);
};
