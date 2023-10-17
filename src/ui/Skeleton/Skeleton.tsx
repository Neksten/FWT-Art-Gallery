import { FC } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface SkeletonProps {
  theme?: "light" | "dark";
}

const Skeleton: FC<SkeletonProps> = ({ theme = "light" }) => {
  return (
    <div className={cx("skeleton", `skeleton-${theme}`)}>
      <div className={cx("skeleton__body")}>
        <div className={cx("skeleton__title")} />
        <div className={cx("skeleton__subtitle")} />
      </div>
    </div>
  );
};

export default Skeleton;
