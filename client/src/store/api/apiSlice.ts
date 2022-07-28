import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SpotDocument {
  title: string;
  description: string;
  location: string;
  _id: string;
}

console.log("urlOrigin",import.meta.env.VITE_APP_SERVER_ENDPOINT)
console.log("urlOrigin",import.meta.env.BASE_URL)
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_SERVER_ENDPOINT,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    fetchSpots: builder.query<SpotDocument[],void>({
      query: () => `/spots`,
    }),
  }),
});

export const {useFetchSpotsQuery} = apiSlice
