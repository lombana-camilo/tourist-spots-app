import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SpotDocument {
  title: string;
  description: string;
  location: string;
  _id: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_SERVER_ENDPOINT,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    fetchSpots: builder.query<SpotDocument[], void>({
      query: () => `/spots`,
    }),
    findSpot: builder.query<SpotDocument, string | undefined>({
      query: (id) => `/spots/${id}`,
    }),
    createSpot: builder.mutation<SpotDocument, Omit<SpotDocument, "_id">>({
      query: (data) => ({
        url: `/spots`,
        method: "POST",
        body: data,
      }),
    }),
    updateSpot: builder.mutation<SpotDocument, SpotDocument>({
      query: ({_id,...data}) => ({
        url: `/spots/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchSpotsQuery,
  useFindSpotQuery,
  useCreateSpotMutation,
  useUpdateSpotMutation,
} = apiSlice;
