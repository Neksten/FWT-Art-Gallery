import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

interface CardsLayoutProps {
  children: ReactNode | ReactNode[];
}

const GridLayout: FC<CardsLayoutProps> = ({ children }) => {
  return <div className={styles.cards}>{children}</div>;
};

export default GridLayout;
