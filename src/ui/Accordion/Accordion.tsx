import { FC, useEffect, useRef, useState } from "react";

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

const MAX_HEIGHT_TEXT = 90;

const Accordion: FC<AccordionProps> = ({ text, isOpen, setIsOpen }) => {
  const { theme } = useTheme();
  const [heightText, setHeightText] = useState(MAX_HEIGHT_TEXT);
  const textRef = useRef<null | HTMLDivElement>(null);
  const textAutoOpen = text.length < 150;

  const handleClickReadMore = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(textAutoOpen);
  }, [setIsOpen, textAutoOpen]);

  useEffect(() => {
    if (isOpen && textRef !== null && textRef.current != null) {
      setHeightText(textRef.current.clientHeight);
    } else {
      setHeightText(MAX_HEIGHT_TEXT);
    }
  }, [isOpen, setHeightText]);

  return (
    <div
      className={cx(styles.accordion, {
        dark: theme === "dark",
        open: isOpen,
      })}
    >
      <div
        style={{ maxHeight: `${heightText}px` }}
        className={styles["accordion__text-container"]}
      >
        <p ref={textRef} className={`${styles.accordion__text} base lh`}>
          {text}
        </p>
      </div>
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
