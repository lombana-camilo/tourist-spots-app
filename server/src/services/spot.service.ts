import { FilterQuery } from "mongoose";
import SpotModel, { Spot } from "./../models/spot.model";

export const getSpots = async () => {
  return await SpotModel.find({});
};

export const findSpot = async (query:FilterQuery<Spot>)=>{
return await SpotModel.findOne(query,{},{lean:true})
}
