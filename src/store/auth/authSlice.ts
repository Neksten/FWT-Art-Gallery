import {
  createSlice,
  isAnyOf,
  isPending,
  PayloadAction,
} from "@reduxjs/toolkit";

import { authApi } from "@/store/auth/auth.api";
import { authLocalStorage } from "@/utils/auth/authLocalStorage";
import { AxiosError } from "axios";

interface Auth {
  isAuth: boolean | null;
  isLoading: boolean;
  error: string;
}

const initialState: Auth = {
  isAuth: null,
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
    const matchRejectedEndpoints = Object.values(authApi.endpoints).map(
      (item) => item.matchRejected
    );
    builder.addMatcher(isPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(...matchRejectedEndpoints),
      (state, { payload }) => {
        state.error = (payload as AxiosError).message;
        state.isLoading = false;
      }
    );
  },
});

export const { logout, setIsAuth } = authSlice.actions;

export default authSlice.reducer;
