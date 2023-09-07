import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IArtist, IArtistProfile } from "@/models/IArtist";

export const artistApi = createApi({
  reducerPath: "arist/api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (build) => ({
    getArtists: build.query<IArtist[], void>({
      query: () => ({
        url: `artists/static`,
      }),
    }),
    getArtist: build.query<IArtistProfile, string>({
      query: (id: string) => ({
        url: `artists/static/${id}`,
      }),
    }),
  }),
});

export const { useGetArtistsQuery, useGetArtistQuery } = artistApi;
