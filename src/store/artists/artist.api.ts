import { IArtistProfile, IArtistResponse } from "@/models/IArtist";
import { apiService } from "@/api";

export const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    getArtists: build.query<IArtistResponse, { isAuth: boolean | null }>({
      query: ({ isAuth }) => ({
        url: isAuth ? "artists" : "artists/static",
      }),
      transformResponse: (response: IArtistResponse, _, arg): any => {
        return arg.isAuth ? response : { data: response, meta: null };
      },
    }),
    getArtistById: build.query<
      IArtistProfile,
      {
        isAuth: boolean | null;
        id: string;
      }
    >({
      query: ({ isAuth, id }) => ({
        url: isAuth ? `artists/${id}` : `artists/static/${id}`,
      }),
    }),
  }),
});

export const { useGetArtistsQuery, useGetArtistByIdQuery } = artistApi;
