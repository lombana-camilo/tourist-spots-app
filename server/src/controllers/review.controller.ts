import { Request, Response } from "express";
import SpotModel from "./../models/spot.model";
import {
  CreateReviewType,
  GetSpotReviewsType,
} from "./../schemas/review.schema";
import { createReview, getSpotReviews } from "./../services/review.service";

export const createReviewHandler = async (
  req: Request<CreateReviewType["params"], {}, CreateReviewType["body"]>,
  res: Response
) => {
  try {
    const { rating, comment } = req.body;
    const spot = await SpotModel.findById(req.params.spot);
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

// export const getSpotReviewsHandler = async (
//   req: Request<GetSpotReviewsType["params"]>,
//   res: Response
// ) => {
//   try {
//     const reviews = await getSpotReviews({ spotId: req.params.spot });
//     return res.send(reviews);
//   } catch (e) {
//     return res.sendStatus(404);
//   }
// };

// export 
