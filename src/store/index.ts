import { configureStore } from "@reduxjs/toolkit";
import { artistApi } from "@/store/artists/artist.api";
import { authApi } from "@/store/auth/auth.api";
import authSlice from "@/store/auth/authSlice";
import { apiService } from "@/api";

export const store = configureStore({
  reducer: {
    [artistApi.reducerPath]: artistApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
