import { FC, useState } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import {
  useDeleteArtistPaintingMutation,
  useEditArtistMainPaintingMutation,
} from "@/store/painting/painting.api";

import { OutsideClickHandler } from "@/components/OutsideClickHandler";
import { EditPaintingButton } from "@/components/EditPaintingButton";
import { DeleteButton } from "@/components/DeleteButton";
import { Card } from "@/ui/Card";
import { ReactComponent as Settings } from "@/assets/icons/settings.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface CardArtistProps {
  title: string;
  years: string;
  paintingId: string;
  mainPaintingId: string;
  artistId: string;
  imgUrl?: string;
  onClick?: () => void;
}

const CardPainting: FC<CardArtistProps> = ({
  title,
  years,
  paintingId,
  artistId,
  imgUrl,
  onClick,
  mainPaintingId,
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [editMainPainting] = useEditArtistMainPaintingMutation();
  const [deleteArtistPainting, { isSuccess: isSuccessDelete }] =
    useDeleteArtistPaintingMutation();

  return (
    <div className={cx("card-artist", `card-artist-${theme}`)}>
      <div className={cx("card-artist__settings")}>
        <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className={cx("card-artist__button-settings")}
          >
            <Settings />
          </button>
          <div
            className={cx("card-artist__body", {
              open: isOpen,
            })}
          >
            <ul className={cx("card-artist__list")}>
              <li className={cx("card-artist__item")}>
                <button
                  type="button"
                  onClick={() =>
                    editMainPainting({
                      artistId,
                      paintingId:
                        paintingId === mainPaintingId ? "" : paintingId,
                    })
                  }
                  className={cx("card-artist__button")}
                >
                  {paintingId === mainPaintingId ? "remove" : "make"} the cover
                </button>
              </li>
              <li className={cx("card-artist__item")}>
                <EditPaintingButton
                  initialData={{
                    name: title,
                    yearOfCreation: years,
                    image: imgUrl || "",
                  }}
                  paintingId={paintingId}
                  artistId={artistId}
                  variant="text"
                  className={cx("card-artist__button")}
                />
              </li>
              <li className={cx("card-artist__item")}>
                <DeleteButton
                  isSuccess={isSuccessDelete}
                  handleDelete={() =>
                    deleteArtistPainting({
                      artistId,
                      paintingId,
                    })
                  }
                  variant="text"
                  variantTitle="painting"
                  className={cx("card-artist__button")}
                />
              </li>
            </ul>
          </div>
        </OutsideClickHandler>
      </div>
      <Card
        onClick={onClick}
        title={title}
        years={years}
        imgUrl={imgUrl}
        theme={theme}
      />
    </div>
  );
};

export default CardPainting;
