import { FilterQuery } from "mongoose";
import ReviewModel, { Review } from "./../models/review.model";

export const createReview = async (review: Review) => {
  return await ReviewModel.create(review);
};

export const getSpotReviews = async (query:FilterQuery<Review>)=>{
   try {
      return await ReviewModel.find(query, {}, { lean: true });
   } catch (e) {
     throw new Error(e) 
   }
}
