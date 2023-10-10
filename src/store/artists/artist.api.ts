import { IArtistProfile, IArtistResponse } from "@/models/IArtist";
import { apiService } from "@/api";

export const artistApi = apiService
  .enhanceEndpoints({
    addTagTypes: ["Artists", "ArtistsDetail"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getArtists: build.query<IArtistResponse, { isAuth: boolean | null }>({
        query: ({ isAuth }) => ({
          url: isAuth ? "/artists" : "/artists/static",
        }),
        transformResponse: (response: IArtistResponse, _, arg): any => {
          return arg.isAuth ? response : { data: response, meta: null };
        },
        providesTags: ["Artists", "ArtistsDetail"],
      }),
      getArtistById: build.query<
        IArtistProfile,
        {
          isAuth: boolean | null;
          artistId: string;
        }
      >({
        query: ({ isAuth, artistId }) => ({
          url: isAuth ? `/artists/${artistId}` : `/artists/static/${artistId}`,
        }),
        providesTags: ["ArtistsDetail"],
      }),
      deleteArtistById: build.mutation<{ artistId: string }, string>({
        query: (artistId) => ({
          url: `/artists/${artistId}`,
          method: "DELETE",
          data: { artistId },
        }),
        invalidatesTags: ["Artists"],
      }),
      addArtist: build.mutation<void, FormData>({
        query: (data) => ({
          url: "/artists",
          method: "POST",
          data,
        }),
        invalidatesTags: ["Artists"],
      }),
      editArtist: build.mutation<void, { artistId: string; data: FormData }>({
        query: ({ artistId, data }) => ({
          url: `/artists/${artistId}`,
          method: "PUT",
          data,
        }),
        invalidatesTags: ["ArtistsDetail"],
      }),
    }),
  });

export const {
  useGetArtistsQuery,
  useGetArtistByIdQuery,
  useDeleteArtistByIdMutation,
  useAddArtistMutation,
  useEditArtistMutation,
} = artistApi;
