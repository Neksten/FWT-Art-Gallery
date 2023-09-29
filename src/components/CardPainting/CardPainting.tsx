import { FC, useState } from "react";
import classNames from "classnames/bind";

import { OutsideClickHandler } from "@/components/OutsideClickHandler";
import { Card } from "@/ui/Card";
import { ReactComponent as Settings } from "@/assets/icons/settings.svg";

import { useTheme } from "@/context/ThemeContext";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface CardArtistProps {
  title: string;
  years: string;
  imgUrl?: string;
  paintingId?: string;
  mainPaintingId?: string;
}

const CardPainting: FC<CardArtistProps> = ({
  title,
  years,
  paintingId,
  imgUrl,
  mainPaintingId,
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cx("card-artist", `card-artist-${theme}`)}>
      <div className={cx("card-artist__settings")}>
        <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className={cx("card-artist__button")}
          >
            <Settings />
          </button>
          {isOpen && (
            <div className={cx("card-artist__body")}>
              <ul className={cx("card-artist__list")}>
                <li className={cx("card-artist__item")}>
                  {paintingId === mainPaintingId ? "remove" : "make"} the cover
                </li>
                <li className={cx("card-artist__item")}>Edit</li>
                <li className={cx("card-artist__item")}>Delete</li>
              </ul>
            </div>
          )}
        </OutsideClickHandler>
      </div>
      <Card title={title} years={years} imgUrl={imgUrl} theme={theme} />
    </div>
  );
};

export default CardPainting;
