import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IArtist } from "@/models/IArtist";

export const artistApi = createApi({
  reducerPath: "arist/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://internship-front.framework.team/",
  }),
  endpoints: (build) => ({
    getArtists: build.query<IArtist[], void>({
      query: () => ({
        url: `artists/static`,
      }),
    }),
  }),
});

export const { useGetArtistsQuery } = artistApi;
