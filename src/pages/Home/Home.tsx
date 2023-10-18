import { FC } from "react";
import classNames from "classnames/bind";

import { useGetArtistsQuery } from "@/store/artists/artist.api";
import { useFilters } from "@/context/FiltersContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";
import { IFilters } from "@/models/Filter";

import { HomeMenu } from "@/pages/Home/HomeMenu";
import { HomeCards } from "@/pages/Home/HomeCards";
import { LoaderLayout } from "@/layouts/LoaderLayout";

import styles from "./styles.module.scss";
import FiltersLayout from "@/layouts/FiltersLayout/FiltersLayout";

const cx = classNames.bind(styles);

const getFiltersRequestBody = (filters: IFilters): IFilters => ({
  sortBy: filters.sortBy,
  name: filters.name,
  genres: filters.genres,
  orderBy: filters.orderBy === "A-Z" ? "asc" : "desc",
  perPage: filters.perPage,
  pageNumber: filters.pageNumber,
});

const Home: FC = () => {
  const { theme } = useTheme();
  const { filters } = useFilters();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const {
    data: artistsData,
    isLoading,
    isFetching,
  } = useGetArtistsQuery(
    {
      isAuth,
      filters: getFiltersRequestBody(filters),
    },
    { skip: isAuth === null }
  );

  const artists = artistsData?.data;

  return (
    <FiltersLayout urlSearch={window.location.search}>
      <main className={cx("home", `home-${theme}`)}>
        <LoaderLayout data={!isLoading && artists}>
          <section className={cx("home__content", "container")}>
            <HomeMenu />
            <HomeCards
              artistsData={artistsData || null}
              isFetching={isFetching}
            />
          </section>
        </LoaderLayout>
      </main>
    </FiltersLayout>
  );
};

export default Home;
