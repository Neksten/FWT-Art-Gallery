import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { AuthRefreshRequest, AuthRequest, AuthResponse } from "@models/Auth";

export const authApi = createApi({
  reducerPath: "auth/api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}auth/`,
  }),
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, AuthRequest>({
      query: (body) => ({
        url: `register`,
        method: "POST",
        body,
      }),
      transformResponse: (response: AuthResponse) => {
        localStorage.setItem("access", response.accessToken);
        localStorage.setItem("refresh", response.refreshToken);
        return response;
      },
    }),
    login: build.mutation<AuthResponse, AuthRequest>({
      query: (body) => ({
        url: `login`,
        method: "POST",
        body,
      }),
    }),
    refresh: build.mutation<AuthResponse, AuthRefreshRequest>({
      query: (body) => ({
        url: `login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshMutation } =
  authApi;
