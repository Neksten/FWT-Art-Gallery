import { FC, MouseEvent } from "react";

import { ReactComponent as ArrowNext } from "@/assets/arrow-next.svg";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface CardProps {
  title: string;
  years: string;
  imgUrl: string;
  theme?: "light" | "dark";
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const Card: FC<CardProps> = ({
  title,
  theme = "light",
  years,
  imgUrl,
  onClick,
}) => {
  return (
    <div
      aria-hidden
      onClick={(e) => onClick?.(e)}
      className={cx("card", `card-${theme}`)}
    >
      <div className={cx("card__image")}>
        <img src={imgUrl} alt="" />
      </div>
      <div className={cx("card__body")}>
        <div className={cx("card__info")}>
          <h6 className={cx("card__title")}>{title}</h6>
          <span className={`${cx("card__date")} small`}>{years}</span>
          <div className={cx("card__arrow")}>
            <ArrowNext />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
