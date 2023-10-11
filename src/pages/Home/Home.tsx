import { FC } from "react";
import classNames from "classnames/bind";

import { useGetArtistsQuery } from "@/store/artists/artist.api";
import { useGetGenresQuery } from "@/store/genre/genre.api";
import { prefixBaseUrl } from "@/utils/prefixBaseUrl";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { AddArtistButton } from "@/components/AddArtistButton";
import { CardLink } from "@/components/CardLink";
import { LoaderLayout } from "@/layouts/LoaderLayout";
import { GridLayout } from "@/layouts/GridLayout";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Home: FC = () => {
  const { theme } = useTheme();
  const { isAuth } = useAppSelector((state) => state.authSlice);
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
      <LoaderLayout data={!isLoading && artists}>
        <section className={cx("home__content", "container")}>
          <nav className={cx("home__menu")}>
            {isAuth && genresData && (
              <AddArtistButton genresList={genresData} />
            )}
          </nav>
          <GridLayout>
            {artists?.map((item) => (
              <CardLink
                to={`/artist/${item._id}`}
                key={item._id}
                title={item.name}
                years={item.yearsOfLife}
                imgUrl={prefixBaseUrl(item?.mainPainting?.image?.src)}
              />
            ))}
          </GridLayout>
        </section>
      </LoaderLayout>
    </main>
  );
};

export default Home;
