import { FC, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { useAppSelector } from "@/hooks/redux";
import {
  useDeleteArtistByIdMutation,
  useGetArtistByIdQuery,
} from "@/store/artists/artist.api";
import { IArtistModal } from "@/models/IArtist";
import { useTheme } from "@/context/ThemeContext";
import { useGetGenresQuery } from "@/store/genre/genre.api";

import { Avatar } from "@/pages/Artist/components/Avatar";
import { DeleteButton } from "@/components/DeleteButton";
import { CardPainting } from "@/components/CardPainting";
import { SliderPaintings } from "@/components/SliderPaintings";
import { AddPaintingCard } from "@/components/AddPaintingCard";
import { EditArtistButton } from "@/components/EditArtistButton";
import { AddPaintingButton } from "@/components/AddPaintingButton";
import { Card } from "@/ui/Card";
import { Genre } from "@/ui/Genre";
import { Loader } from "@/ui/Loader";
import { Button } from "@/ui/Button";
import { Accordion } from "@/ui/Accordion";
import { GridLayout } from "@/ui/GridLayout";
import { ReactComponent as ArrowBack } from "@/assets/icons/arrow-back.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Artist: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [isOpenDescription, setIsOpenDescriptions] = useState(false);
  const [isOpenSlider, setIsOpenSlider] = useState(false);
  const [initialActiveSlide, setInitialActiveSlide] = useState(0);
  const [deleteArtist, { isSuccess: isSuccessDelete }] =
    useDeleteArtistByIdMutation();
  const { data } = useGetArtistByIdQuery(
    { isAuth, artistId: id || "" },
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

  const handleClickCard = (index: number) => {
    setIsOpenSlider(true);
    setInitialActiveSlide(index);
  };

  const handleDeleteArtist = (artistId: string) => {
    deleteArtist(artistId).then((e) => {
      if ("data" in e) {
        navigate("/");
      }
    });
  };

  return (
    <main className={cx("artist", `artist-${theme}`)}>
      {isAuth && isOpenSlider && (
        <SliderPaintings
          artistId={id || ""}
          initialActiveSlide={initialActiveSlide}
          setIsOpen={setIsOpenSlider}
          data={data?.paintings || []}
          mainPaintingId={data?.mainPainting?._id || ""}
        />
      )}
      {data ? (
        <div className={cx("artist__content", "container")}>
          <nav className={cx("artist__menu", "artist-menu")}>
            <Link to="/">
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                theme={theme}
                className={cx("artist__back-button")}
              >
                Back
              </Button>
            </Link>
            {isAuth && (
              <div className={cx("artist-menu__right")}>
                {isAuth && genresData && (
                  <EditArtistButton
                    initialData={initialData}
                    artistId={id || ""}
                    genresList={genresData}
                  />
                )}
                {isAuth && (
                  <DeleteButton
                    isSuccess={isSuccessDelete}
                    handleDelete={() => handleDeleteArtist(id || "")}
                    title="Do you want to delete this artist profile?"
                  />
                )}
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
            <Avatar avatar={data.avatar.src} />
          </section>
          <section className={cx("artist__artworks", "artist-artworks")}>
            <h3 className={cx("artist-artworks__title")}>Artworks</h3>
            <nav className={cx("artist-artworks__menu")}>
              {isAuth && <AddPaintingButton artistId={id || ""} />}
            </nav>
            {data.paintings.length > 0 ? (
              <div className={cx("artist-artworks__paintings")}>
                <GridLayout>
                  {data.paintings.map((painting, index) =>
                    isAuth ? (
                      <CardPainting
                        key={painting._id}
                        title={painting.name}
                        years={painting.yearOfCreation}
                        imgUrl={`${process.env.REACT_APP_BASE_URL}${painting.image.src}`}
                        artistId={id || ""}
                        paintingId={painting._id}
                        mainPaintingId={data.mainPainting?._id || ""}
                        onClick={() => handleClickCard(index)}
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
              isAuth && (
                <>
                  <AddPaintingCard artistId={id || ""} />
                  <h4 className={cx("artist-artworks__explanation", "md")}>
                    The paintings of this artist have not been uploaded yet.
                  </h4>
                </>
              )
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
