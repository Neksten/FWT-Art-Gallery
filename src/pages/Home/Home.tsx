import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import qs from "qs";

import { useGetArtistsQuery } from "@/store/artists/artist.api";
import { useFilters } from "@/context/FiltersContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";
import { IFilters } from "@/models/Filter";

import { HomeMenu } from "@/pages/Home/HomeMenu";
import { HomeCards } from "@/pages/Home/HomeCards";
import { LoaderLayout } from "@/layouts/LoaderLayout";

import styles from "./styles.module.scss";

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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    filters,
    changeFilters,
    changeFiltersLoaded,
    filtersLoaded,
    initialFilters,
  } = useFilters();
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

  useEffect(() => {
    changeFilters(initialFilters);
  }, [changeFilters, pathname, initialFilters]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");

      return;
    }

    if (!window.location.search) {
      navigate(`?${qs.stringify(filtersLoaded)}`);

      return;
    }

    const params = qs.parse(window.location.search.substring(1));
    const defaultFilters = { ...filters, ...params };

    navigate(`?${qs.stringify(params)}`);
    changeFiltersLoaded(defaultFilters);
    changeFilters(defaultFilters);
    // eslint-disable-next-line
  }, [isAuth]);

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
