import React, { AnchorHTMLAttributes, FC } from "react";

import { classParser } from "@helpers/classParser";
import styles from "./styles.module.scss";

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
