import React, { FC, ReactNode } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface GenreProps {
  children?: ReactNode;
  theme?: "light" | "dark";
}

const Genre: FC<GenreProps> = ({ theme = "light", children }) => {
  return (
    <p className={cx(styles.genre, styles[`genre-${theme}`], "tiny", "md")}>
      {children}
    </p>
  );
};

export default Genre;
