import { FilterQuery } from "mongoose";
import ReviewModel, { Review } from "./../models/review.model";

export const createReview = async (review: Review) => {
  return await ReviewModel.create(review);
};

export const deleteReview = async (query: FilterQuery<Review>) => {
  return await ReviewModel.findOneAndDelete(query, { lean: true });
};
