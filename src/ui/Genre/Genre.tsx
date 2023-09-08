import React, { FC, PropsWithChildren } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface GenreProps extends PropsWithChildren {
  theme?: "light" | "dark";
}

const Genre: FC<GenreProps> = ({ theme = "light", children }) => {
  return (
    <p className={cx("genre", `genre-${theme}`, "tiny", "md")}>{children}</p>
  );
};

export default Genre;
