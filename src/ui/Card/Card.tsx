import { FC, MouseEvent } from "react";

import styles from "./styles.module.scss";
import { ArrowNext } from "../../assets/ArrowNext";
import { classParser } from "../helpers/classParser";

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
  const rootClasses: string[] = ["card", `card-${theme}`];

  return (
    <div
      aria-hidden
      onClick={(e) => onClick?.(e)}
      className={classParser(rootClasses, styles)}
    >
      <div className={styles.card__image}>
        <img src={imgUrl} alt="" />
      </div>
      <div className={styles.card__body}>
        <div className={styles.card__info}>
          <h6 className={styles.card__title}>{title}</h6>
          <span className={`${styles.card__date} small`}>{years}</span>
          <div className={styles.card__arrow}>
            <ArrowNext />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
