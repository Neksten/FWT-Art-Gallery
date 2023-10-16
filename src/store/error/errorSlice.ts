import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { artistApi } from "@/store/artists/artist.api";
import { genreApi } from "@/store/genre/genre.api";
import { authApi } from "@/store/auth/auth.api";
import { apiService } from "@/api";

interface IErrorSliceState {
  error: string;
}

const initialState: IErrorSliceState = {
  error: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    resetError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    const endpoints = {
      ...artistApi.endpoints,
      ...genreApi.endpoints,
      ...authApi.endpoints,
    };
    const matchRejectedEndpoints = Object.keys(apiService.endpoints).map(
      (key) => endpoints[key as keyof typeof endpoints].matchRejected
    );
    builder.addMatcher(
      isAnyOf(...matchRejectedEndpoints),
      (state, { payload }) => {
        state.error = (payload as AxiosError).message;
      }
    );
  },
});

export const { resetError } = errorSlice.actions;

export default errorSlice.reducer;
