import React, { AnchorHTMLAttributes, FC } from "react";

import styles from "./styles.module.scss";
import { classParser } from "../helpers/classParser";

interface MyLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  theme?: "light" | "dark";
}

const MyLink: FC<MyLinkProps> = ({ theme = "light", children, ...props }) => {
  const rootClasses: string[] = ["link", `link-${theme}`];

  return (
    <a {...props} className={classParser(rootClasses, styles)}>
      {children}
    </a>
  );
};

export default MyLink;
