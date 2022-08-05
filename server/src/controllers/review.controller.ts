import { Request, Response } from "express";
import SpotModel from "./../models/spot.model";
import { CreateReviewType, DeleteReviewType } from "./../schemas/review.schema";
import { createReview, deleteReview } from "./../services/review.service";

export const createReviewHandler = async (req: Request<CreateReviewType["params"],{},CreateReviewType["body"]>, res: Response) => {
  try {
    const { rating, comment } = req.body;
    const spot = await SpotModel.findById(req.params.spotId);
    if (!spot) {
      return res.sendStatus(404);
    }
    const review = await createReview({ rating, comment });
    spot.reviews.push(review);
    await spot.save();
    return res.send(review);
  } catch (e) {
    return res.sendStatus(404);
  }
};

export const deleteReviewHandler = async (
  req: Request<DeleteReviewType["params"]>,
  res: Response
) => {
  try {
    const { spotId, reviewId } = req.params;
    // Delete from spot foreign keys
    await SpotModel.findByIdAndUpdate(spotId, { $pull: { reviews: reviewId } });

    // Delete from review model
    const deleted = await deleteReview({ _id: reviewId });

    return res.send(deleted);
  } catch (e) {
    return res.sendStatus(400);
  }
};
