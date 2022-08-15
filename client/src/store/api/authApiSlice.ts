import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SessionData {
  _id: string | null;
  email: string | null;
  username: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  sessionId: string | null;
  iat: number | null;
  exp: number | null;
}

interface Session {
  email: string;
  password: string;
}

interface Deleted{
   accessToken:null | string
   refreshToken:null | string
}
export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_SERVER_ENDPOINT,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<SessionData, void>({
      query: () => `/users/me`,
    }),
    createSession: builder.mutation<SessionData, Session>({
      query: (data) => ({
        url: `/sessions`,
        method: "POST",
        body: data,
      }),
    }),
    createUser: builder.mutation<void, Session>({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
    }),
    deleteSession: builder.mutation<Deleted, void>({
      query: () => ({
        url: `/sessions`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetCurrentUserQuery,
   useGetCurrentUserQuery,
  useCreateUserMutation,
  useCreateSessionMutation,
  useDeleteSessionMutation,
} = authApiSlice;
