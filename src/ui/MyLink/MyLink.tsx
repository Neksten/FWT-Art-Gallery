import React, { AnchorHTMLAttributes, FC } from "react";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface MyLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  theme?: "light" | "dark";
}

const MyLink: FC<MyLinkProps> = ({ theme = "light", children, ...props }) => {
  return (
    <a {...props} className={cx(styles.link, styles[`link-${theme}`])}>
      {children}
    </a>
  );
};

export default MyLink;
