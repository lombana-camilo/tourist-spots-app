import { number, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    rating: number().gte(0).lte(5),
    comment: string().min(1, "Comment is required"),
  }),
};

const params = {
  params: object({
    spot: string().min(1, "spot Id is required"),
  }),
};

export const createReviewSchema = object({ ...payload,...params });
export const getSpotReviewsSchema = object({ ...params });
// export const deleteReviewSchema = object({ ...params,...params });

export type CreateReviewType = TypeOf<typeof createReviewSchema>;
export type GetSpotReviewsType = TypeOf<typeof getSpotReviewsSchema>;
// export type DeleteReviewType = TypeOf<typeof deleteReviewSchema>;
