import {
  createSlice,
  isAnyOf,
  isPending,
  PayloadAction,
} from "@reduxjs/toolkit";

import { authApi } from "@/store/auth/auth.api";
import { authLocalStorage } from "@/helpers/authLocalStorage";
import { IError } from "@/models/IError";

interface Auth {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: Auth = {
  isAuth: false,
  isLoading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      authLocalStorage.remove();
    },
  },
  extraReducers: (builder) => {
    const matchFulfilledEndpoints = Object.values(authApi.endpoints).map(
      (item) => item.matchFulfilled
    );
    const matchRejectedEndpoints = Object.values(authApi.endpoints).map(
      (item) => item.matchRejected
    );
    builder.addMatcher(isPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(...matchFulfilledEndpoints),
      (state, { payload }) => {
        authLocalStorage.set(payload);
        state.isAuth = true;
        state.error = "";
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(...matchRejectedEndpoints),
      (state, { payload }) => {
        state.error = (payload?.data as IError).message;
        state.isLoading = false;
      }
    );
  },
});

export const { logout, setIsAuth } = authSlice.actions;

export default authSlice.reducer;
