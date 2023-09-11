import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { useGetArtistQuery } from "@/store/artists/artist.api";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { GridLayout } from "@/ui/GridLayout";
import { Accordion } from "@/ui/Accordion";
import { Genre } from "@/ui/Genre";
import { Loader } from "@/ui/Loader";
import { ReactComponent as ArrowBack } from "@/assets/icons/arrow-back.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Artist: FC = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const [isOpenDescription, setIsOpenDescriptions] = useState<boolean>(false);
  const { data } = useGetArtistQuery(String(id));

  return (
    <main className={cx("artist", `artist-${theme}`)}>
      {data ? (
        <div className={cx("artist__content", "container")}>
          <nav className={cx("artist__menu")}>
            <Link to="/">
              <div className={cx("artist__back")}>
                <div className={cx("artist__arrow")}>
                  <ArrowBack />
                </div>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  theme={theme}
                  className={cx("artist__back-button")}
                >
                  Back
                </Button>
              </div>
            </Link>
          </nav>
          <section className={cx("artist__hero", "artist-hero")}>
            <div className={cx("artist-hero__info", "artist-hero-info")}>
              <div className={cx("artist-hero-info__intelligence")}>
                <span className={cx("artist-hero-info__date", "medium")}>
                  {data.yearsOfLife}
                </span>
                <h3 className={cx("artist-hero-info__title")}>{data.name}</h3>
              </div>
              <div className={cx("artist-hero-info__data")}>
                <Accordion
                  text={data.description}
                  isOpen={isOpenDescription}
                  setIsOpen={setIsOpenDescriptions}
                />
                <div className={cx("artist-hero-info__genres")}>
                  {data.genres.map((genre) => (
                    <Genre key={genre._id} theme={theme}>
                      {genre.name}
                    </Genre>
                  ))}
                </div>
              </div>
            </div>
            <div className={cx("artist-hero__image-container")}>
              {data.avatar && (
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${data.avatar.src}`}
                  alt="artist"
                  className={cx("artist-hero__image")}
                />
              )}
            </div>
          </section>
          <section className={cx("artist__artworks", "artist-artworks")}>
            <h3 className={cx("artist-artworks__title")}>Artworks</h3>
            <div className={cx("artist-artworks__paintings")}>
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
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Artist;
