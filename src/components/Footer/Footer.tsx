import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { MyLink } from "@/ui/MyLink";
import { ReactComponent as Fb } from "@/assets/icons/fb.svg";
import { ReactComponent as Inst } from "@/assets/icons/inst.svg";
import { ReactComponent as Vk } from "@/assets/icons/vk.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Footer: FC = () => {
  const { theme } = useTheme();
  return (
    <footer className={cx("footer", `footer-${theme}`)}>
      <div className={cx("footer__content", "container")}>
        <div className={cx("footer__left")}>
          <div className={cx("footer__info")}>
            <p className={cx("footer__text")}>
              Проект реализован в рамках стажировки для Frontend-разработчиков
              от компании
            </p>
            <MyLink to="https://framework.team/" className={cx("footer__link")}>
              Framework Team
            </MyLink>
          </div>
          <p className={cx("footer__name")}>Иванов Иван, 2021</p>
        </div>
        <div className={cx("footer__socials")}>
          <Fb />
          <Vk />
          <Inst />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
