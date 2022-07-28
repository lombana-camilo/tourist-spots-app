import SpotModel from "./../models/spot.model";

export const getSpots = async () => {
  return await SpotModel.find({});
};
