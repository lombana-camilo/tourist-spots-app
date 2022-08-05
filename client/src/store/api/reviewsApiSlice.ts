import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ReviewReceive {
  comment: string;
  rating: number;
  _id: string;
}
export interface CreateReviewSend {
  comment: string;
  rating: number;
  spotId: string;
}
export interface DeleteReviewSend{
   spotId: string
   reviewId:string
}

export const reviewsApiSlice = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_SERVER_ENDPOINT,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // fetchSpots: builder.query<ReviewDocument[], void>({
    //   query: () => `/spots/all`,
    // }),
    // findSpotReviews: builder.query<CreateReviewReceive, string | undefined>({
    //   query: (spotId) => `/reviews/${spotId}`,
    // }),
    createReview: builder.mutation<ReviewReceive, CreateReviewSend>(
      {
        query: ({spotId,...data}) => ({
          url: `/spots/${spotId}/reviews`,
          method: "POST",
          body: data,
        }),
      }
    ),
    // updateSpot: builder.mutation<ReviewDocument, ReviewDocument>({
    //   query: ({ _id, ...data }) => ({
    //     url: `/spots/${_id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
    deleteReview: builder.mutation<ReviewReceive,DeleteReviewSend  >({
      query: ({spotId,reviewId}) => ({
        url: `/spots/${spotId}/reviews/${reviewId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateReviewMutation,useDeleteReviewMutation} = reviewsApiSlice;
