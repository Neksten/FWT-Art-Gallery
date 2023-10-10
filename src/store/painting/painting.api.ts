import { apiService } from "@/api";

interface IAddArtistPainting {
  artistId: string;
  data: FormData;
}

interface IEditArtistPainting {
  artistId: string;
  paintingId: string;
  data: FormData;
}

interface IDeleteOrEditArtistPainting {
  artistId: string;
  paintingId: string;
}

export const paintingApi = apiService
  .enhanceEndpoints({
    addTagTypes: ["Artists", "ArtistsDetail"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      addArtistPainting: build.mutation<void, IAddArtistPainting>({
        query: ({ artistId, data }) => ({
          url: `/artists/${artistId}/paintings`,
          method: "POST",
          data,
        }),
        invalidatesTags: ["ArtistsDetail"],
      }),
      editArtistPainting: build.mutation<void, IEditArtistPainting>({
        query: ({ artistId, paintingId, data }) => ({
          url: `/artists/${artistId}/paintings/${paintingId}`,
          method: "PUT",
          data,
        }),
        invalidatesTags: ["ArtistsDetail"],
      }),
      deleteArtistPainting: build.mutation<void, IDeleteOrEditArtistPainting>({
        query: ({ artistId, paintingId }) => ({
          url: `/artists/${artistId}/paintings/${paintingId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ArtistsDetail"],
      }),
      editArtistMainPainting: build.mutation<void, IDeleteOrEditArtistPainting>(
        {
          query: ({ artistId, paintingId }) => ({
            url: `/artists/${artistId}/main-painting`,
            method: "PATCH",
            data: { mainPainting: paintingId },
          }),
          invalidatesTags: ["Artists", "ArtistsDetail"],
        }
      ),
    }),
  });

export const {
  useAddArtistPaintingMutation,
  useEditArtistPaintingMutation,
  useEditArtistMainPaintingMutation,
  useDeleteArtistPaintingMutation,
} = paintingApi;
