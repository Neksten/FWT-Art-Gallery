import { apiService } from "@/api";

export const paintingApi = apiService
  .enhanceEndpoints({
    addTagTypes: ["Artists", "ArtistsDetail"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
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
  useAddArtistPaintingMutation,
  useEditArtistPaintingMutation,
  useEditArtistMainPaintingMutation,
  useDeleteArtistPaintingMutation,
} = paintingApi;
