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
import { ReactComponent as Plus } from "@/assets/icons/plus.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Home: FC = () => {
  const { theme } = useTheme();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const { data: artistsData, isLoading } = useGetArtistsQuery(
    { isAuth },
    { skip: isAuth === null }
  );
  const { data: genresData } = useGetGenresQuery(
    { isAuth },
    { skip: isAuth === null }
  );

  const artists = artistsData?.data;
  return (
    <main className={cx("home", `home-${theme}`)}>
      {isAuth && isOpenAdd && genresData && (
        <ArtistModal
          genresList={genresData}
          variant="add"
          setIsOpen={setIsOpenAdd}
        />
      )}
      {!isLoading && artists ? (
        <section className={cx("home__content", "container")}>
          <nav className={cx("home__menu")}>
            {isAuth && (
              <Button
                onClick={() => setIsOpenAdd(true)}
                variant="outlined"
                startIcon={<Plus />}
                theme={theme}
              >
                Add Artist
              </Button>
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
