import { IArtistProfile, IArtistResponse } from "@/models/IArtist";
import { apiService } from "@/api";
import { IFilters } from "@/models/Filter";

interface IGetArtist {
  isAuth: boolean | null;
}

interface IDeleteArtistById {
  artistId: string;
}

type IGetArtistById = IGetArtist & IDeleteArtistById;

interface IEditArtist extends IDeleteArtistById {
  data: FormData;
}

export const artistApi = apiService
  .enhanceEndpoints({
    addTagTypes: ["Artists", "ArtistsDetail"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getArtists: build.query<
        IArtistResponse,
        { isAuth: boolean | null; filters: IFilters }
      >({
        query: ({ isAuth, filters }) => ({
          url: isAuth ? "/artists" : "/artists/static",
          params: filters,
        }),
        transformResponse: (response: IArtistResponse, _, arg): any => {
          return arg.isAuth ? response : { data: response, meta: null };
        },
        providesTags: ["Artists", "ArtistsDetail"],
      }),
      getArtistById: build.query<IArtistProfile, IGetArtistById>({
        query: ({ isAuth, artistId }) => ({
          url: isAuth ? `/artists/${artistId}` : `/artists/static/${artistId}`,
        }),
        providesTags: ["ArtistsDetail"],
      }),
      deleteArtistById: build.mutation<IDeleteArtistById, string>({
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
      editArtist: build.mutation<void, IEditArtist>({
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
