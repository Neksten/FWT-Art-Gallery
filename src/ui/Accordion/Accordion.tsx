import { FC, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";

import { MyLink } from "@/ui/MyLink";
import { ReactComponent as Expand } from "@/assets/icons/expand.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface AccordionProps {
  text: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const MAX_HEIGHT_TEXT = 90;
const MAX_LENGTH_TEXT = 150;

const Accordion: FC<AccordionProps> = ({ text, isOpen, setIsOpen }) => {
  const { theme } = useTheme();
  const [heightText, setHeightText] = useState(MAX_HEIGHT_TEXT);
  const textRef = useRef<null | HTMLDivElement>(null);
  const textAutoOpen = text.length < MAX_LENGTH_TEXT;

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
      className={cx("accordion", `accordion-${theme}`, {
        open: isOpen,
      })}
    >
      <div
        style={{ maxHeight: `${heightText}px` }}
        className={cx("accordion__text-container")}
      >
        <p ref={textRef} className={cx("accordion__text", "base", "lh")}>
          {text}
        </p>
      </div>
      {!textAutoOpen && (
        <div
          aria-hidden
          onClick={() => setIsOpen(!isOpen)}
          className={cx("accordion__button")}
        >
          <MyLink to="#" theme={theme}>
            Read {isOpen ? "less" : "more"}
          </MyLink>
          <div className={cx("accordion__button-arrow")}>
            <Expand />
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
