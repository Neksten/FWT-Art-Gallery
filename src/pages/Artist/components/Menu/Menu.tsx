import { FC } from "react";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";

import { useDeleteArtistByIdMutation } from "@/store/artists/artist.api";
import { IArtistModal, IArtistProfile } from "@/models/IArtist";
import { useGetGenresQuery } from "@/store/genre/genre.api";
import { prefixBaseUrl } from "@/utils/prefixBaseUrl";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { EditArtistButton } from "@/components/EditArtistButton";
import { DeleteButton } from "@/components/DeleteButton";
import { Button } from "@/ui/Button";
import { ReactComponent as ArrowBack } from "@/assets/icons/arrow-back.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface MenuProps {
  data: IArtistProfile;
  artistId: string;
}

const Menu: FC<MenuProps> = ({ data, artistId }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [deleteArtist, { isSuccess: isSuccessDelete }] =
    useDeleteArtistByIdMutation();
  const { data: genresData } = useGetGenresQuery(
    { isAuth },
    { skip: isAuth === null }
  );

  const initialData: IArtistModal = {
    name: data?.name || "",
    yearsOfLife: data?.yearsOfLife || "",
    description: data?.description || "",
    genres: data?.genres || [],
    avatar: prefixBaseUrl(data?.avatar?.src),
  };

  const handleDeleteArtist = (id: string) => {
    deleteArtist(id).then((e) => {
      if ("data" in e) {
        navigate("/");
      }
    });
  };

  return (
    <nav className={cx("menu", `menu-${theme}`)}>
      <Link to="/">
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          theme={theme}
          className={cx("menu__back")}
        >
          Back
        </Button>
        <div className={cx("menu__arrow")}>
          <ArrowBack />
        </div>
      </Link>
      {isAuth && (
        <div className={cx("menu__right")}>
          <EditArtistButton
            initialData={initialData}
            artistId={artistId}
            genresList={genresData || []}
          />
          <DeleteButton
            isSuccess={isSuccessDelete}
            handleDelete={() => handleDeleteArtist(artistId)}
            title="Do you want to delete this artist profile?"
          />
        </div>
      )}
    </nav>
  );
};

export default Menu;
