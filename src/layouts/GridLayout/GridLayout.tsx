import { FC, ReactNode } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface CardsLayoutProps {
  children: ReactNode | ReactNode[];
}

const GridLayout: FC<CardsLayoutProps> = ({ children }) => (
  <div className={cx("cards")}>{children}</div>
);

export default GridLayout;
