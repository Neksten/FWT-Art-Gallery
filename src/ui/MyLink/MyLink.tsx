import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface MyLinkProps extends LinkProps {
  theme?: "light" | "dark";
}

const MyLink: FC<MyLinkProps> = ({ theme = "light", className, ...props }) => {
  return <Link {...props} className={cx("link", `link-${theme}`, className)} />;
};

export default MyLink;
