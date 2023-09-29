import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { useAppSelector } from "@/hooks/redux";
import { useGetArtistByIdQuery } from "@/store/artists/artist.api";
import { useGetGenresQuery } from "@/store/genre/genre.api";
import { useTheme } from "@/context/ThemeContext";
import { IArtistModal } from "@/models/IArtist";

import { ArtistModal } from "@/components/ArtistModal";
import { DeleteModal } from "@/components/DeleteModal";
import { PaintingModal } from "@/components/PaintingModal";
import { CardPainting } from "@/components/CardPainting";
import { Card } from "@/ui/Card";
import { IconButton } from "@/ui/IconButton";
import { Button } from "@/ui/Button";
import { GridLayout } from "@/ui/GridLayout";
import { Accordion } from "@/ui/Accordion";
import { Genre } from "@/ui/Genre";
import { Loader } from "@/ui/Loader";
import { NoImage } from "@/ui/NoImage";
import { ReactComponent as ArrowBack } from "@/assets/icons/arrow-back.svg";
import { ReactComponent as Delete } from "@/assets/icons/delete.svg";
import { ReactComponent as Edit } from "@/assets/icons/edit.svg";
import { ReactComponent as Plus } from "@/assets/icons/plus.svg";
import { ReactComponent as Photo } from "@/assets/icons/photo.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Artist: FC = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenModalArtist, setIsOpenModalArtist] = useState(false);
  const [isOpenModalPainting, setIsOpenModalPainting] = useState(false);
  const [isOpenDescription, setIsOpenDescriptions] = useState(false);
  const { data } = useGetArtistByIdQuery(
    { isAuth, id: id || "" },
    { skip: isAuth === null }
  );
  const { data: genresData } = useGetGenresQuery(
    { isAuth },
    { skip: isAuth === null }
  );

  const initialData: IArtistModal = {
    name: data?.name || "",
    yearsOfLife: data?.yearsOfLife || "",
    description: data?.description || "",
    genres: data?.genres || [],
    avatar: data?.avatar
      ? `${process.env.REACT_APP_BASE_URL}${data.avatar.src}`
      : "",
  };

  return (
    <main className={cx("artist", `artist-${theme}`)}>
      {isAuth && isOpenDelete && (
        <DeleteModal
          title="Do you want to delete this artist profile?"
          setIsOpen={setIsOpenDelete}
        />
      )}
      {isAuth && genresData && isOpenModalArtist && (
        <ArtistModal
          initialData={initialData}
          idArtist={id}
          genresList={genresData}
          setIsOpen={setIsOpenModalArtist}
        />
      )}
      {isAuth && isOpenModalPainting && (
        <PaintingModal idArtist={id || ""} setIsOpen={setIsOpenModalPainting} />
      )}
      {data ? (
        <div className={cx("artist__content", "container")}>
          <nav className={cx("artist__menu", "artist-menu")}>
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
            {isAuth && (
              <div className={cx("artist-menu__right")}>
                <IconButton
                  onClick={() => setIsOpenModalArtist(true)}
                  theme={theme}
                >
                  <Edit />
                </IconButton>
                <IconButton onClick={() => setIsOpenDelete(true)} theme={theme}>
                  <Delete />
                </IconButton>
              </div>
            )}
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
            <div
              className={cx("artist-hero__image-container", {
                empty: !data?.avatar?.src,
              })}
            >
              {data.avatar ? (
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${data.avatar.src}`}
                  alt="artist"
                  className={cx("artist-hero__image")}
                />
              ) : (
                <NoImage variant="big" theme={theme} />
              )}
            </div>
          </section>
          <section className={cx("artist__artworks", "artist-artworks")}>
            <h3 className={cx("artist-artworks__title")}>Artworks</h3>
            <nav className={cx("artist-artworks__menu")}>
              {isAuth && (
                <Button
                  onClick={() => setIsOpenModalPainting(true)}
                  variant="outlined"
                  theme={theme}
                  startIcon={<Plus />}
                  className={cx("artist-artworks__button")}
                >
                  Add picture
                </Button>
              )}
            </nav>
            {data.paintings.length > 0 ? (
              <div className={cx("artist-artworks__paintings")}>
                <GridLayout>
                  {data.paintings.map((painting) =>
                    isAuth ? (
                      <CardPainting
                        key={painting._id}
                        title={painting.name}
                        years={painting.yearOfCreation}
                        imgUrl={`${process.env.REACT_APP_BASE_URL}${painting.image.src}`}
                        paintingId={painting._id}
                        mainPaintingId={data.mainPainting._id}
                      />
                    ) : (
                      <Card
                        key={painting._id}
                        title={painting.name}
                        years={painting.yearOfCreation}
                        imgUrl={`${process.env.REACT_APP_BASE_URL}${painting.image.src}`}
                        theme={theme}
                      />
                    )
                  )}
                </GridLayout>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className={cx(
                    "artist-artworks__empty",
                    "artist-artworks-empty"
                  )}
                >
                  <div className={cx("artist-artworks-empty__icon")}>
                    <Photo />
                  </div>
                  <div className={cx("artist-artworks-empty__add")}>
                    <Plus />
                  </div>
                </button>
                <h4 className={cx("artist-artworks__explanation", "md")}>
                  The paintings of this artist have not been uploaded yet.
                </h4>
              </>
            )}
          </section>
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Artist;
