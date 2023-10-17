import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import { useGetArtistsQuery } from "@/store/artists/artist.api";
import { useGetGenresQuery } from "@/store/genre/genre.api";
import { useFilters } from "@/context/FiltersContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { FiltersModal } from "@/components/FiltersModal";
import { ArtistModal } from "@/components/ArtistModal";
import { HomeCards } from "@/pages/Home/HomeCards";
import { HomeMenu } from "@/pages/Home/HomeMenu";
import { Loader } from "@/ui/Loader";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Home: FC = () => {
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const { filters, changeFilters } = useFilters();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(false);
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
  const { data: genresData } = useGetGenresQuery(
    { isAuth },
    { skip: isAuth === null }
  );

  useEffect(() => {
    changeFilters({ ...filters, name: "" });
    // eslint-disable-next-line
  }, [changeFilters, pathname]);

  return (
    <main className={cx("home", `home-${theme}`)}>
      {isAuth && isOpenFiltersModal && (
        <FiltersModal setIsOpen={setIsOpenFiltersModal} />
      )}
      {isAuth && isOpenAddModal && genresData && (
        <ArtistModal
          genresList={genresData}
          variant="add"
          setIsOpen={setIsOpenAddModal}
        />
      )}
      {!isLoading ? (
        <section className={cx("home__content", "container")}>
          <HomeMenu
            setIsOpenAddModal={setIsOpenAddModal}
            setIsOpenFiltersModal={setIsOpenFiltersModal}
          />
          <HomeCards
            artistsData={artistsData || null}
            isFetching={isFetching}
          />
        </section>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Home;
