import { FC } from "react";
import classNames from "classnames/bind";

import { ReactComponent as ErrorIcon } from "@/assets/icons/error.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface ErrorProps {
  error: string;
  className?: string;
}

const Error: FC<ErrorProps> = ({ error, className }) => {
  return (
    <p className={cx("error", className)}>
      <ErrorIcon />
      {error}
    </p>
  );
};

export default Error;
