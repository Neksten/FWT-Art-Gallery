import { FC, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { uid } from "uid";

import { useGetArtistsQuery } from "@/store/artists/artist.api";
import { useGetGenresQuery } from "@/store/genre/genre.api";
import { useFilters } from "@/context/FiltersContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { FiltersModal } from "@/components/FiltersModal";
import { ArtistModal } from "@/components/ArtistModal";
import { CardLink } from "@/components/CardLink";
import { InputSearch } from "@/ui/InputSearch";
import { GridLayout } from "@/ui/GridLayout";
import { IconButton } from "@/ui/IconButton";
import { Skeleton } from "@/ui/Skeleton";
import { Loader } from "@/ui/Loader";
import { Button } from "@/ui/Button";
import { ReactComponent as Plus } from "@/assets/icons/plus.svg";
import { ReactComponent as Filters } from "@/assets/icons/filter.svg";
import InfiniteScroll from "react-infinite-scroll-component";

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

  const artists = artistsData?.data;
  const dataLength = artistsData?.meta?.count ?? 9;

  const onNextPage = useCallback(() => {
    changeFilters({ ...filters, perPage: filters.perPage + 6 });
  }, [filters, changeFilters]);

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
          <nav className={cx("home__menu", "home-menu")}>
            {isAuth && (
              <>
                <Button
                  onClick={() => setIsOpenAddModal(true)}
                  variant="outlined"
                  startIcon={<Plus />}
                  theme={theme}
                >
                  Add Artist
                </Button>
                <div className={cx("home-menu__right")}>
                  <InputSearch
                    value={filters.name}
                    setValue={(value: string) =>
                      changeFilters({ ...filters, name: value })
                    }
                    placeholder="Search"
                    theme={theme}
                    className={cx("home-menu__search")}
                  />
                  <IconButton
                    onClick={() => setIsOpenFiltersModal(true)}
                    theme={theme}
                  >
                    <Filters />
                  </IconButton>
                </div>
              </>
            )}
          </nav>
          <InfiniteScroll
            dataLength={artists?.length || 0}
            next={onNextPage}
            hasMore={artists ? dataLength - artists.length >= 1 : false}
            loader={
              isFetching && (
                <GridLayout>
                  {[
                    ...Array(
                      artists && dataLength - artists.length < 6
                        ? dataLength - artists.length
                        : 6
                    ),
                  ].map(() => (
                    <Skeleton key={uid()} />
                  ))}
                </GridLayout>
              )
            }
          >
            {artists && artists.length >= 1 && (
              <GridLayout>
                {artists.map((item) => (
                  <CardLink
                    to={`/artist/${item._id}`}
                    key={item._id}
                    title={item.name}
                    years={item.yearsOfLife}
                    imgUrl={
                      item.mainPainting
                        ? `${process.env.REACT_APP_BASE_URL}${item.mainPainting.image.src}`
                        : ""
                    }
                  />
                ))}
              </GridLayout>
            )}
          </InfiniteScroll>
        </section>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Home;
