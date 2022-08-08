import { Request, Response } from "express";
import { get } from "lodash";
import mongoose from "mongoose";
import ReviewModel from "./../models/review.model";
import SpotModel from "./../models/spot.model";
import { CreateReviewType, DeleteReviewType } from "./../schemas/review.schema";
import { createReview, deleteReview } from "./../services/review.service";

export const createReviewHandler = async (
  req: Request<CreateReviewType["params"], {}, CreateReviewType["body"]>,
  res: Response
) => {
  try {
    const { rating, comment } = req.body;
    const { spotId } = req.params;
    const userId = res.locals.user._id;
    const spotObjectId = new mongoose.Types.ObjectId(spotId);
    const spot = await SpotModel.findById(spotId);
    if (!spot) {
      return res.sendStatus(404);
    }
    let review = await createReview({
      user: userId,
      rating,
      comment,
      spotId: spotObjectId,
    });
    review = await review.populate("user");
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
    const userId = res.locals.user._id;
    const { spotId, reviewId } = req.params;

    //Ownership control
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      return res.sendStatus(404);
    }
    console.log("review.user", get(review.user, "_id").toString());
    console.log("sessionUserId", userId);
    if (get(review.user, "_id").toString() !== userId) {
      return res
        .status(403)
        .send("You do not have permission to delete this review!");
    }

    // Delete from spot foreign keys
    await SpotModel.findByIdAndUpdate(spotId, { $pull: { reviews: reviewId } });

    // Delete from review model
    const deleted = await deleteReview({ _id: reviewId });

    return res.send(deleted);
  } catch (e) {
    return res.sendStatus(400);
  }
};
