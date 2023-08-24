import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

import styles from "./styles.module.scss";
import { classParser } from "../helpers/classParser";

interface MyLinkProps extends LinkProps {
  theme?: "light" | "dark";
}

const MyLink: FC<MyLinkProps> = ({ theme = "light", ...props }) => {
  const rootClasses: string[] = ["link", `link-${theme}`];

  return <Link {...props} className={classParser(rootClasses, styles)} />;
};

export default MyLink;
