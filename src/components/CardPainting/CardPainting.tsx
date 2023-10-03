import { FC, useState } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import {
  useDeleteArtistPaintingMutation,
  useEditArtistMainPaintingMutation,
} from "@/store/artists/artist.api";

import { OutsideClickHandler } from "@/components/OutsideClickHandler";
import { PaintingModal } from "@/components/PaintingModal";
import { DeleteModal } from "@/components/DeleteModal";
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
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalPainting, setIsOpenModalPainting] = useState(false);
  const [editMainPainting] = useEditArtistMainPaintingMutation();
  const [deleteArtistPainting] = useDeleteArtistPaintingMutation();

  return (
    <div className={cx("card-artist", `card-artist-${theme}`)}>
      {isOpenModalDelete && (
        <DeleteModal
          handleDelete={() =>
            deleteArtistPainting({
              artistId,
              paintingId,
            })
          }
          title="Do you want to delete this picture?"
          setIsOpen={setIsOpenModalDelete}
        />
      )}
      {isOpenModalPainting && (
        <PaintingModal
          initialData={{
            name: title,
            yearOfCreation: years,
            image: imgUrl || "",
          }}
          paintingId={paintingId}
          variant="edit"
          artistId={artistId}
          setIsOpen={setIsOpenModalPainting}
        />
      )}
      <div className={cx("card-artist__settings")}>
        <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className={cx("card-artist__button-settings")}
          >
            <Settings />
          </button>
          {isOpen && (
            <div className={cx("card-artist__body")}>
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
                    {paintingId === mainPaintingId ? "remove" : "make"} the
                    cover
                  </button>
                </li>
                <li className={cx("card-artist__item")}>
                  <button
                    type="button"
                    onClick={() => setIsOpenModalPainting(true)}
                    className={cx("card-artist__button")}
                  >
                    Edit
                  </button>
                </li>
                <li className={cx("card-artist__item")}>
                  <button
                    type="button"
                    onClick={() => setIsOpenModalDelete(true)}
                    className={cx("card-artist__button")}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
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
