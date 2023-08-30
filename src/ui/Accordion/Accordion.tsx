import { FC, useEffect } from "react";

import MyLink from "@ui/MyLink/MyLink";
import { ReactComponent as Expand } from "@assets/expand.svg";
import { useTheme } from "@hooks/useTheme";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface AccordionProps {
  text: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Accordion: FC<AccordionProps> = ({ text, isOpen, setIsOpen }) => {
  const { theme } = useTheme();
  const textAutoOpen = text.length < 150;

  const handleClickReadMore = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(textAutoOpen);
  }, [setIsOpen, textAutoOpen]);

  return (
    <div
      className={cx(styles.accordion, {
        dark: theme === "dark",
        open: isOpen,
      })}
    >
      <p className={`${styles.accordion__text} base lh`}>{text}</p>
      {!textAutoOpen && (
        <div
          aria-hidden
          onClick={handleClickReadMore}
          className={styles.accordion__button}
        >
          <MyLink to="#" theme={theme}>
            Read {isOpen ? "less" : "more"}
          </MyLink>
          <Expand />
        </div>
      )}
    </div>
  );
};

export default Accordion;
