import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@hooks/useTheme";
import { GridLayout } from "@ui/GridLayout";
import { Card } from "@ui/Card";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Home: FC = () => {
  const { theme } = useTheme();

  return (
    <main className={cx(styles.home, styles[`home-${theme}`])}>
      <section className={`${styles.home__content} container`}>
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
