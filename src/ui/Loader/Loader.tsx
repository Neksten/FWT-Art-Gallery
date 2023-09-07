import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Loader: FC = () => {
  const { theme } = useTheme();

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cx("loader-container")}
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        className={cx("loader", `loader-${theme}`)}
      />
    </svg>
  );
};

export default Loader;
