import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ReviewDocument {
  comment: string;
  rating: number;
  _id: string;
  user: User;
}
interface User {
  username: string;
  email: string;
  _id: string;
}
interface Image{
   url:string,
   filename:string
}
export interface SpotDocument {
  title: string;
  description: string;
  location: string;
  images: Image[]
  reviews: ReviewDocument[];
  _id: string;
  user: User;
}

export const spotsApiSlice = createApi({
  reducerPath: "spotsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_SERVER_ENDPOINT,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    fetchSpots: builder.query<SpotDocument[], void>({
      query: () => `/spots/all`,
    }),
    findSpot: builder.query<SpotDocument, string | undefined>({
      query: (id) => `/spots/${id}`,
    }),
    createSpot: builder.mutation<SpotDocument, FormData>({
      query: (data) => ({
        url: `/spots`,
        method: "POST",
        body: data,
      }),
    }),
    updateSpot: builder.mutation<
      SpotDocument,
      Omit<SpotDocument, "reviews" | "user">
    >({
      query: ({ _id, ...data }) => ({
        url: `/spots/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteSpot: builder.mutation<void, string | undefined>({
      query: (id) => ({
        url: `/spots/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchSpotsQuery,
  useFindSpotQuery,
  useCreateSpotMutation,
  useUpdateSpotMutation,
  useDeleteSpotMutation,
} = spotsApiSlice;
