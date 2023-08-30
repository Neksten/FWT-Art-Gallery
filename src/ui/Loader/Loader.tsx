import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@hooks/useTheme";

import styles from "./Loader.module.scss";

const cx = classNames.bind(styles);

const Loader: FC = () => {
  const { theme } = useTheme();

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={styles["loader-container"]}
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        className={cx(styles.loader, styles[`loader-${theme}`])}
      />
    </svg>
  );
};

export default Loader;
