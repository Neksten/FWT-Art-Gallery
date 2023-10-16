import { FC } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Skeleton: FC = () => {
  return (
    <div className={cx("skeleton")}>
      <div className={cx("skeleton__body")}>
        <div className={cx("skeleton__title")} />
        <div className={cx("skeleton__subtitle")} />
      </div>
    </div>
  );
};

export default Skeleton;
