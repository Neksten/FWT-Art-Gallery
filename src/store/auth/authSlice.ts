import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { authApi } from "@/store/auth/auth.api";
import { authLocalStorage } from "@/helpers/authLocalStorage";

interface Auth {
  isAuth: boolean;
}

const initialState: Auth = {
  isAuth: false,
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
    builder.addMatcher(
      isAnyOf(...matchFulfilledEndpoints),
      (state, { payload }) => {
        authLocalStorage.set(payload);
        state.isAuth = true;
      }
    );
  },
});

export const { logout, setIsAuth } = authSlice.actions;

export default authSlice.reducer;
