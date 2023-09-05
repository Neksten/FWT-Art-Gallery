import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  },
});

export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
