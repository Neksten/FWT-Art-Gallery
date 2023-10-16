import { AuthRequest, AuthResponse } from "@/models/Auth";
import { apiService } from "@/api";

export const authApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        data,
      }),
    }),
    login: build.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
