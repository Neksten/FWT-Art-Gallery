import { FC, useEffect } from "react";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";

import { useGetArtistsQuery } from "@/store/artists/artist.api";
import { useFilters } from "@/context/FiltersContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { HomeMenu } from "@/pages/Home/HomeMenu";
import { HomeCards } from "@/pages/Home/HomeCards";
import { LoaderLayout } from "@/layouts/LoaderLayout";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Home: FC = () => {
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const { filters, changeFilters } = useFilters();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const {
    data: artistsData,
    isLoading,
    isFetching,
  } = useGetArtistsQuery(
    {
      isAuth,
      filters: {
        sortBy: "name",
        name: filters.name,
        genres: filters.genres,
        orderBy: filters.orderBy === "A-Z" ? "asc" : "desc",
        perPage: filters.perPage,
        pageNumber: filters.pageNumber,
      },
    },
    { skip: isAuth === null }
  );

  const artists = artistsData?.data;

  useEffect(() => {
    changeFilters({ ...filters, name: "" });
    // eslint-disable-next-line
  }, [changeFilters, pathname]);

  return (
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
  );
};

export default Home;
