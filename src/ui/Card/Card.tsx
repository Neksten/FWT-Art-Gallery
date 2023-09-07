import { ButtonHTMLAttributes, FC } from "react";

import { ReactComponent as ArrowNext } from "@/assets/arrow-next.svg";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface CardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  years: string;
  imgUrl: string;
  theme?: "light" | "dark";
}

const Card: FC<CardProps> = ({
  title,
  theme = "light",
  years,
  imgUrl,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cx("card", `card-${theme}`, className)}
      {...props}
    >
      <div className={cx("card__image-container")}>
        <img src={imgUrl} className={cx("card__image")} alt="" />
      </div>
      <div className={cx("card__body")}>
        <div className={cx("card__info")}>
          <h6 className={cx("card__title")}>{title}</h6>
          <span className={cx("card__date", "small")}>{years}</span>
          <div className={cx("card__arrow")}>
            <ArrowNext />
          </div>
        </div>
      </div>
    </button>
  );
};

export default Card;
