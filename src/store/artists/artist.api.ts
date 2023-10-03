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
      addArtistPainting: build.mutation<
        void,
        { artistId: string; data: FormData }
      >({
        query: ({ artistId, data }) => ({
          url: `/artists/${artistId}/paintings`,
          method: "POST",
          data,
        }),
        invalidatesTags: ["ArtistsDetail"],
      }),
      editArtistPainting: build.mutation<
        void,
        { artistId: string; paintingId: string; data: FormData }
      >({
        query: ({ artistId, paintingId, data }) => ({
          url: `/artists/${artistId}/paintings/${paintingId}`,
          method: "PUT",
          data,
        }),
        invalidatesTags: ["ArtistsDetail"],
      }),
      deleteArtistPainting: build.mutation<
        void,
        { artistId: string; paintingId: string }
      >({
        query: ({ artistId, paintingId }) => ({
          url: `/artists/${artistId}/paintings/${paintingId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ArtistsDetail"],
      }),
      editArtistMainPainting: build.mutation<
        void,
        { artistId: string; paintingId: string }
      >({
        query: ({ artistId, paintingId }) => ({
          url: `/artists/${artistId}/main-painting`,
          method: "PATCH",
          data: { mainPainting: paintingId },
        }),
        invalidatesTags: ["Artists", "ArtistsDetail"],
      }),
    }),
  });

export const {
  useGetArtistsQuery,
  useGetArtistByIdQuery,
  useDeleteArtistByIdMutation,
  useAddArtistMutation,
  useEditArtistMutation,
  useAddArtistPaintingMutation,
  useEditArtistPaintingMutation,
  useEditArtistMainPaintingMutation,
  useDeleteArtistPaintingMutation,
} = artistApi;
