import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authLocalStorage } from "@/utils/auth/authLocalStorage";

interface Auth {
  isAuth: boolean | null;
}

const initialState: Auth = {
  isAuth: null,
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
});

export const { logout, setIsAuth } = authSlice.actions;

export default authSlice.reducer;
