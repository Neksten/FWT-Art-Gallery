import { FC } from "react";
import classNames from "classnames/bind";

import { NoImage } from "@/ui/NoImage";
import { ReactComponent as ArrowNext } from "@/assets/icons/arrow-next.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface CardProps {
  title: string;
  years: string;
  imgUrl?: string;
  theme?: "light" | "dark";
  onClick?: () => void;
}

const Card: FC<CardProps> = ({
  title,
  theme = "light",
  onClick,
  years,
  imgUrl,
}) => {
  return (
    <div
      role="presentation"
      onClick={onClick}
      className={cx("card", `card-${theme}`)}
    >
      {imgUrl ? (
        <div className={cx("card__image-container")}>
          <img src={imgUrl} className={cx("card__image")} alt="" />
        </div>
      ) : (
        <NoImage theme={theme} />
      )}
      <div className={cx("card__body")}>
        <div className={cx("card__info")}>
          <h6 className={cx("card__title")}>{title}</h6>
          <span className={cx("card__date", "small")}>{years}</span>
          <div className={cx("card__arrow")}>
            <ArrowNext />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
