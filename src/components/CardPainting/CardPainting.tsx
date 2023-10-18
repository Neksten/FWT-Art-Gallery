import { DragEvent, FC, useState } from "react";
import classNames from "classnames/bind";

import { prefixBaseUrl } from "@/utils/prefixBaseUrl";
import { IPaintingDrag } from "@/models/IPainting";
import { useTheme } from "@/context/ThemeContext";
import {
  useDeleteArtistPaintingMutation,
  useEditArtistMainPaintingMutation,
} from "@/store/painting/painting.api";

import { Card } from "@/ui/Card";
import { DeleteButton } from "@/components/DeleteButton";
import { EditPaintingButton } from "@/components/EditPaintingButton";
import { OutsideClickHandler } from "@/components/OutsideClickHandler";
import { ReactComponent as Settings } from "@/assets/icons/settings.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface CardArtistProps {
  painting: IPaintingDrag;
  mainPaintingId: string;
  artistId: string;
  onClick?: () => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>, card: IPaintingDrag) => void;
  handleDragEnd: (e: DragEvent<HTMLDivElement>, card: IPaintingDrag) => void;
}

const CardPainting: FC<CardArtistProps> = ({
  painting,
  artistId,
  onClick,
  mainPaintingId,
  handleDragOver,
  handleDragEnd,
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [editMainPainting] = useEditArtistMainPaintingMutation();
  const { _id: paintingId, name, yearOfCreation, image } = painting;
  const imgUrl = prefixBaseUrl(image?.src);
  const [deleteArtistPainting, { isSuccess: isSuccessDelete }] =
    useDeleteArtistPaintingMutation();

  return (
    <div
      draggable
      onDragOver={(e) => handleDragOver(e, painting)}
      onDragEnd={(e) => handleDragEnd(e, painting)}
      className={cx("card-artist", `card-artist-${theme}`)}
    >
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
                    name,
                    yearOfCreation,
                    image: imgUrl,
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
        title={name}
        years={yearOfCreation}
        imgUrl={imgUrl}
        theme={theme}
        className={cx("card-artist__card")}
      />
    </div>
  );
};

export default CardPainting;
