import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "../../hooks/useTheme";
import { useGetArtistsQuery } from "../../store/artists/artist.api";
import GridLayout from "../../ui/GridLayout/GridLayout";
import Card from "../../ui/Card/Card";

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
      <section className={`${styles.home__content} container`}>
        <GridLayout>
          {data?.map((item) => (
            <Card
              key={item._id}
              title={item.name}
              years={item.yearsOfLife}
              imgUrl="../1.jpg"
              theme={theme}
            />
          ))}
        </GridLayout>
      </section>
    </main>
  );
};

export default Home;
