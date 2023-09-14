import { BaseQueryFn, createApi } from "@reduxjs/toolkit/dist/query/react";
import { AuthRequest, AuthResponse } from "@/models/Auth";
import { AxiosError, AxiosRequestConfig } from "axios";
import instance from "@/api/instance";

const axiosBaseQuery =
  <T>(): BaseQueryFn<AxiosRequestConfig, T> =>
  async (config: AxiosRequestConfig<T>) => {
    try {
      return await instance(config);
    } catch (axiosError) {
      return {
        error: (axiosError as AxiosError).response?.data,
      };
    }
  };

export const authApi = createApi({
  reducerPath: "auth/api",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        data,
      }),
    }),
    login: build.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
