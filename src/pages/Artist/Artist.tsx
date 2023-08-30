import { FC, useState } from "react";

import Button from "@ui/Button/Button";
import { ReactComponent as ArrowBack } from "@assets/arrow-back.svg";
import { ReactComponent as Expand } from "@assets/expand.svg";
import MyLink from "@ui/MyLink/MyLink";
import Card from "@ui/Card/Card";
import GridLayout from "@ui/GridLayout/GridLayout";
import classNames from "classnames/bind";

import { useTheme } from "@hooks/useTheme";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Artist: FC = () => {
  const { theme } = useTheme();
  const [isOpenDescription, setIsOpenDescriptions] = useState<boolean>(false);

  const handleClickReadMore = () => {
    setIsOpenDescriptions(!isOpenDescription);
  };

  return (
    <main
      className={cx(`${styles.artist}`, {
        dark: theme === "dark",
      })}
    >
      <div className={cx(styles.artist__content, "container")}>
        <nav className={styles.artist__menu}>
          <Button variant="outlined" startIcon={<ArrowBack />} theme={theme}>
            Back
          </Button>
        </nav>
        <section className={cx(styles.artist__hero, styles["artist-hero"])}>
          <div
            className={cx(
              styles["artist-hero__info"],
              styles["artist-hero-info"]
            )}
          >
            <div className={styles["artist-hero-info__intelligence"]}>
              <span className={cx(styles["artist-hero-info__date"], "medium")}>
                29 july 1817 – 2 may 1900
              </span>
              <h3 className={styles["artist-hero-info__title"]}>
                Ivan Aivazovsky
              </h3>
              <span
                className={cx(styles["artist-hero-info__country"], "medium")}
              >
                Feodosia, Russian Empire
              </span>
            </div>
            <div className={styles["artist-hero-info__data"]}>
              <p
                className={cx(`${styles["artist-hero-info__text"]} base lh`, {
                  open: isOpenDescription,
                })}
              >
                Following his education at the Imperial Academy of Arts in Saint
                Petersburg, Aivazovsky traveled to Europe and lived briefly in
                Italy in the early 1840s. He then returned to Russia and was
                appointed the main painter of the Russian Navy. Aivazovsky had
                close ties with the military and political elite of the Russian
                Empire and often attended military maneuvers. He was sponsored
                by the state and was well-regarded during his lifetime. The
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                saying "worthy of Aivazovsky's brush", popularized by Anton
                Chekhov, was used in Russia for describing something lovely. He
                remains highly popular in Russia in the 21st century.
              </p>
              <div
                aria-hidden
                onClick={handleClickReadMore}
                className={styles["artist-hero-info__button"]}
              >
                <MyLink to="#" theme={theme}>
                  Read more
                </MyLink>
                <Expand />
              </div>
              <div className={styles["artist-hero-info__genres"]}>
                <p
                  className={cx(
                    styles["artist-hero-info__genre"],
                    "tiny",
                    "md"
                  )}
                >
                  Romanticism
                </p>
                <p
                  className={cx(
                    styles["artist-hero-info__genre"],
                    "tiny",
                    "md"
                  )}
                >
                  Art
                </p>
                <p
                  className={cx(
                    styles["artist-hero-info__genre"],
                    "tiny",
                    "md"
                  )}
                >
                  Nature
                </p>
                <p
                  className={cx(
                    styles["artist-hero-info__genre"],
                    "tiny",
                    "md"
                  )}
                >
                  Bataille
                </p>
                <p
                  className={cx(
                    styles["artist-hero-info__genre"],
                    "tiny",
                    "md"
                  )}
                >
                  Realistic
                </p>
              </div>
            </div>
          </div>
          <div className={styles["artist-hero__image"]}>
            <img src="../2.jpg" alt="artist" />
          </div>
        </section>
        <section
          className={cx(styles.artist__artworks, styles["artist-artworks"])}
        >
          <h3 className={styles["artist-artworks__title"]}>Artworks</h3>
          <div className={styles["artist-artworks__paintings"]}>
            <GridLayout>
              {[...Array(5)].map(() => (
                <Card
                  to="#"
                  title="Jean-Honor Fragonard"
                  years="1732 - 1806"
                  imgUrl="../1.jpg"
                  theme={theme}
                />
              ))}
            </GridLayout>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Artist;
