import { configureStore } from "@reduxjs/toolkit";
import { artistApi } from "./artists/artist.api";

export const store = configureStore({
  reducer: {
    [artistApi.reducerPath]: artistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artistApi.middleware),
});
