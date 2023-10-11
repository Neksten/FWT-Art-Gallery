import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { useAppSelector } from "@/hooks/redux";
import { useGetArtistByIdQuery } from "@/store/artists/artist.api";
import { useTheme } from "@/context/ThemeContext";

import { Artworks } from "@/pages/Artist/components/Artworks";
import { Menu } from "@/pages/Artist/components/Menu";
import { Hero } from "@/pages/Artist/components/Hero";
import { LoaderLayout } from "@/layouts/LoaderLayout";
import { SliderPaintings } from "@/components/SliderPaintings";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Artist: FC = () => {
  const { id } = useParams();
  const artistId = id || "";
  const { theme } = useTheme();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [isOpenSlider, setIsOpenSlider] = useState(false);
  const [initialActiveSlide, setInitialActiveSlide] = useState(0);
  const { data } = useGetArtistByIdQuery(
    { isAuth, artistId },
    { skip: isAuth === null }
  );

  const handleClickCard = (index: number) => {
    setIsOpenSlider(true);
    setInitialActiveSlide(index);
  };

  return (
    <main className={cx("artist", `artist-${theme}`)}>
      {isAuth &&
        isOpenSlider &&
        data?.paintings &&
        data.paintings.length > 0 && (
          <SliderPaintings
            artistId={artistId}
            initialActiveSlide={initialActiveSlide}
            setIsOpen={setIsOpenSlider}
            data={data.paintings}
            mainPaintingId={data?.mainPainting?._id || ""}
          />
        )}
      <LoaderLayout data={data}>
        {data && (
          <div className={cx("artist__content", "container")}>
            <Menu data={data} artistId={artistId} />
            <Hero data={data} />
            <Artworks
              data={data}
              artistId={artistId}
              handleClickCard={handleClickCard}
            />
          </div>
        )}
      </LoaderLayout>
    </main>
  );
};

export default Artist;
