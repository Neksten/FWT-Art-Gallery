import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@hooks/useTheme";
import GridLayout from "@ui/GridLayout/GridLayout";
import Card from "@ui/Card/Card";

import Loader from "@ui/Loader/Loader";
import { useGetArtistsQuery } from "@store/artists/artist.api";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Home: FC = () => {
  const { theme } = useTheme();
  const { data } = useGetArtistsQuery("");
  return (
    <main
      className={cx(`${styles.home}`, {
        dark: theme === "dark",
      })}
    >
      {data ? (
        <section className={`${styles.home__content} container`}>
          <GridLayout>
            {data.map((item) => (
              <Card
                to={`/artist/${item._id}`}
                key={item._id}
                title={item.name}
                years={item.yearsOfLife}
                imgUrl={`${process.env.REACT_APP_BASE_URL}${item.mainPainting.image.src}`}
                theme={theme}
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
