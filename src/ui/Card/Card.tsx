import { FC, MouseEvent } from "react";

import styles from "./card.module.scss";

interface CardProps {
  title: string;
  years: string;
  imgUrl: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const Card: FC<CardProps> = ({ title, years, imgUrl, onClick }) => {
  return (
    <div aria-hidden onClick={(e) => onClick?.(e)} className={styles.card}>
      <div className={styles.card__image}>
        <img src={imgUrl} alt="" />
      </div>
      <div className={styles.card__body}>
        <div className={styles.card__info}>
          <h6 className={styles.card__title}>{title}</h6>
          <span className={`${styles.card__date} small`}>{years}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
