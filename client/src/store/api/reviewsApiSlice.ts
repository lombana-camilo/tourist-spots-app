import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CreateReviewReceive {
  comment: string;
  rating: number;
  _id: string;
}
export interface CreateReviewSend {
  comment: string;
  rating: number;
  spotId: string;
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
    createReview: builder.mutation<CreateReviewReceive, CreateReviewSend>(
      {
        query: ({spotId,...data}) => ({
          url: `/spots/reviews/${spotId}`,
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
    // deleteSpot: builder.mutation<void, string | undefined>({
    //   query: (id) => ({
    //     url: `/spots/${id}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const { useCreateReviewMutation} = reviewsApiSlice;
