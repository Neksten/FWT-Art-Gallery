import { FC, useState } from "react";

import Button from "@ui/Button/Button";
import { ReactComponent as ArrowBack } from "@assets/arrow-back.svg";
import Card from "@ui/Card/Card";
import GridLayout from "@ui/GridLayout/GridLayout";
import classNames from "classnames/bind";

import { useTheme } from "@hooks/useTheme";
import Accordion from "@ui/Accordion/Accordion";
import { Link, useParams } from "react-router-dom";

import Genre from "@ui/Genre/Genre";
import styles from "./styles.module.scss";
import { useGetArtistQuery } from "../../store/artists/artist.api";

const cx = classNames.bind(styles);

const Artist: FC = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const [isOpenDescription, setIsOpenDescriptions] = useState<boolean>(false);
  const { data } = useGetArtistQuery(String(id));

  return (
    <main
      className={cx(`${styles.artist}`, {
        dark: theme === "dark",
      })}
    >
      {data && (
        <div className={cx(styles.artist__content, "container")}>
          <nav className={styles.artist__menu}>
            <Link to="/">
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                theme={theme}
              >
                Back
              </Button>
            </Link>
          </nav>
          <section className={cx(styles.artist__hero, styles["artist-hero"])}>
            <div
              className={cx(
                styles["artist-hero__info"],
                styles["artist-hero-info"]
              )}
            >
              <div className={styles["artist-hero-info__intelligence"]}>
                <span
                  className={cx(styles["artist-hero-info__date"], "medium")}
                >
                  {data.yearsOfLife}
                </span>
                <h3 className={styles["artist-hero-info__title"]}>
                  {data.name}
                </h3>
              </div>
              <div className={styles["artist-hero-info__data"]}>
                <Accordion
                  text={String(data.description)}
                  isOpen={isOpenDescription}
                  setIsOpen={setIsOpenDescriptions}
                />
                <div className={styles["artist-hero-info__genres"]}>
                  {data.genres.map((genre) => (
                    <Genre key={genre._id} theme={theme}>
                      {genre.name}
                    </Genre>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles["artist-hero__image"]}>
              {data.avatar && (
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${data.avatar.src}`}
                  alt="artist"
                />
              )}
            </div>
          </section>
          <section
            className={cx(styles.artist__artworks, styles["artist-artworks"])}
          >
            <h3 className={styles["artist-artworks__title"]}>Artworks</h3>
            <div className={styles["artist-artworks__paintings"]}>
              <GridLayout>
                {data.paintings.map((painting) => (
                  <Card
                    key={painting._id}
                    to="#"
                    title={painting.name}
                    years={painting.yearOfCreation}
                    imgUrl={`${process.env.REACT_APP_BASE_URL}${painting.image.src}`}
                    theme={theme}
                  />
                ))}
              </GridLayout>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Artist;
