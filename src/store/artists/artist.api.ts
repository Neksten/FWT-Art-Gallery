import { IArtistProfile, IArtistResponse } from "@/models/IArtist";
import { IFilters } from "@/models/Filter";
import { apiService } from "@/api";

interface IGetArtist {
  isAuth: boolean | null;
  filters: IFilters;
}

interface IDeleteArtistById {
  artistId: string;
}

type IGetArtistById = {
  isAuth: boolean | null;
} & IDeleteArtistById;

interface IEditArtist extends IDeleteArtistById {
  data: FormData;
}

export const artistApi = apiService
  .enhanceEndpoints({
    addTagTypes: ["Artists", "ArtistsDetail"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getArtists: build.query<IArtistResponse, IGetArtist>({
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
