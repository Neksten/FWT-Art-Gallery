import { FC } from "react";
import classNames from "classnames/bind";

import { MyLink } from "@ui/MyLink";
import { ReactComponent as Fb } from "@assets/fb.svg";
import { ReactComponent as Inst } from "@assets/inst.svg";
import { ReactComponent as Vk } from "@assets/vk.svg";
import { useTheme } from "@hooks/useTheme";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Footer: FC = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={cx(`${styles.footer}`, {
        dark: theme === "dark",
      })}
    >
      <div className={`${styles.footer__content} container`}>
        <div className={styles.footer__left}>
          <div className={styles.footer__info}>
            <p className={styles.footer__text}>
              Проект реализован в рамках стажировки для Frontend-разработчиков
              от компании
            </p>
            <MyLink to="https://framework.team/">Framework Team</MyLink>
          </div>
          <p className={styles.footer__name}>Иванов Иван, 2021</p>
        </div>
        <div className={styles.footer__socials}>
          <Fb />
          <Inst />
          <Vk />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
