import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SpotDocument {
  title: string;
  description: string;
  location: string;
  _id: string;
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
    createSpot: builder.mutation<SpotDocument, Omit<SpotDocument, "_id">>({
      query: (data) => ({
        url: `/spots`,
        method: "POST",
        body: data,
      }),
    }),
    updateSpot: builder.mutation<SpotDocument, SpotDocument>({
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
