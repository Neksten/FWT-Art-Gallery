import { FC } from "react";
import classNames from "classnames/bind";

import GridLayout from "@/ui/GridLayout/GridLayout";
import Card from "@/ui/Card/Card";
import { useTheme } from "@/context/ThemeContext/ThemeContext";

import { useGetArtistsQuery } from "@/store/artists/artist.api";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Home: FC = () => {
  const { theme } = useTheme();
  const { data } = useGetArtistsQuery();

  return (
    <main
      className={cx("home", {
        dark: theme === "dark",
      })}
    >
      <section className={cx("home__content", "container")}>
        <GridLayout>
          {data?.map((item) => (
            <Card
              key={item._id}
              title={item.name}
              years={item.yearsOfLife}
              imgUrl={`https://internship-front.framework.team/${item.mainPainting.image.src}`}
              theme={theme}
            />
          ))}
        </GridLayout>
      </section>
    </main>
  );
};

export default Home;
