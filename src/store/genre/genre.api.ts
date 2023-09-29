import { apiService } from "@/api";
import { IGenre } from "@/models/IGenre";

export const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<IGenre[], { isAuth: boolean | null }>({
      query: ({ isAuth }) => ({
        url: isAuth ? "genres" : "genres/static",
      }),
    }),
  }),
});

export const { useGetGenresQuery } = artistApi;
