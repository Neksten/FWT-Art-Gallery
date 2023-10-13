import { FC, useState } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";
import { useGetArtistsQuery } from "@/store/artists/artist.api";
import { useGetGenresQuery } from "@/store/genre/genre.api";

import { ArtistModal } from "@/components/ArtistModal";
import { CardLink } from "@/components/CardLink";
import { GridLayout } from "@/ui/GridLayout";
import { Loader } from "@/ui/Loader";
import { Button } from "@/ui/Button";
import { InputSearch } from "@/ui/InputSearch";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Plus } from "@/assets/icons/plus.svg";
import { ReactComponent as Filters } from "@/assets/icons/filter.svg";

import { FiltersModal } from "@/components/FiltersModal";
import { useFilters } from "@/context/FiltersContext";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Home: FC = () => {
  const { theme } = useTheme();
  const { filters } = useFilters();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(false);
  const [search, setSearch] = useState("");
  const { data: artistsData, isLoading } = useGetArtistsQuery(
    {
      isAuth,
      filters: {
        sortBy: "name",
        name: search,
        genres: filters[0].type === "genres" ? filters[0].values : [],
        orderBy:
          filters[1].type === "orderBy" && filters[1].value === "A-Z"
            ? "asc"
            : "desc",
      },
    },
    { skip: isAuth === null }
  );
  const { data: genresData } = useGetGenresQuery(
    { isAuth },
    { skip: isAuth === null }
  );

  const artists = artistsData?.data;

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
      {!isLoading && artists ? (
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
                    value={search}
                    setValue={setSearch}
                    placeholder="Search"
                    theme={theme}
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
        </section>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Home;
