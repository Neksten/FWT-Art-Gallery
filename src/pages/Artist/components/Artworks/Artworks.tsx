import { FC } from "react";
import classNames from "classnames/bind";

import { IArtistProfile } from "@/models/IArtist";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { AddPaintingButton } from "@/components/AddPaintingButton";
import { Paintings } from "@/pages/Artist/components/Paintings";
import { AddPaintingCard } from "@/components/AddPaintingCard";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface ArtworksProps {
  data: IArtistProfile;
  artistId: string;
  handleClickCard: (index: number) => void;
}

const Artworks: FC<ArtworksProps> = ({ data, artistId, handleClickCard }) => {
  const { theme } = useTheme();
  const { isAuth } = useAppSelector((state) => state.authSlice);

  return (
    <section className={cx("artworks", `artworks-${theme}`)}>
      <h3 className={cx("artworks__title")}>Artworks</h3>
      <nav className={cx("artworks__menu")}>
        {isAuth && <AddPaintingButton artistId={artistId} />}
      </nav>
      {data.paintings.length > 0 ? (
        <Paintings
          data={data}
          artistId={artistId}
          handleClickCard={handleClickCard}
        />
      ) : (
        isAuth && (
          <>
            <AddPaintingCard artistId={artistId} />
            <h4 className={cx("artworks__explanation", "md")}>
              The paintings of this artist have not been uploaded yet.
            </h4>
          </>
        )
      )}
    </section>
  );
};

export default Artworks;
