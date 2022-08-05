import { number, object, string, TypeOf } from "zod";

export const createReviewSchema = object({
  body: object({
    rating: number().gte(0).lte(5),
    comment: string().min(1, "Comment is required"),
  }),

  params: object({
    spotId: string().min(1, "spot Id is required"),
  }),
});

export const deleteReviewsSchema = object({
  params: object({
    spotId: string().min(1, "spot Id is required"),
    reviewId: string().min(1, "Review Id is required"),
  }),
});

export type CreateReviewType = TypeOf<typeof createReviewSchema>;
export type DeleteReviewType = TypeOf<typeof deleteReviewsSchema>;
