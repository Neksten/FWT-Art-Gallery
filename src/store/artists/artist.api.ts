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
          id: string;
        }
      >({
        query: ({ isAuth, id }) => ({
          url: isAuth ? `/artists/${id}` : `/artists/static/${id}`,
        }),
        providesTags: ["ArtistsDetail"],
      }),
      deleteArtistById: build.mutation<{ id: string }, string>({
        query: (id) => ({
          url: `/artists/${id}`,
          method: "DELETE",
          data: { id },
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
      editArtist: build.mutation<void, { id: string; data: FormData }>({
        query: (data) => ({
          url: `/artists/${data.id}`,
          method: "PUT",
          data: data.data,
        }),
        invalidatesTags: ["ArtistsDetail"],
      }),
      addArtistPainting: build.mutation<void, { id: string; data: FormData }>({
        query: ({ id, data }) => ({
          url: `/artists/${id}/paintings`,
          method: "POST",
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
  useAddArtistPaintingMutation,
} = artistApi;
