import { FC } from "react";
import classNames from "classnames/bind";

import GridLayout from "@/ui/GridLayout/GridLayout";
import Card from "@/ui/Card/Card";
import { useTheme } from "@/context/ThemeContext";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Home: FC = () => {
  const { theme } = useTheme();

  return (
    <main className={cx("home", `home-${theme}`)}>
      <section className={cx("home__content", "container")}>
        <GridLayout>
          {[...Array(5)].map(() => (
            <Card
              title="Jean-Honore Fragonard"
              years="1732 - 1806"
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
