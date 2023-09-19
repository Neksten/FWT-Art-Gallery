import { FC, useRef, useState } from "react";
import classNames from "classnames/bind";

import { Checkbox } from "@/ui/Checkbox";
import { Genre } from "@/ui/Genre";
import { ReactComponent as Expand } from "@/assets/icons/expand.svg";
import { OutsideClickHandler } from "@/components/OutsideClickHandler";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface MultiselectProps {
  title: string;
  list: string[];
  listSelect: string[];
  setListSelect: (value: string[]) => void;
  className: string;
  theme?: "light" | "dark";
}

const Multiselect: FC<MultiselectProps> = ({
  title,
  list,
  listSelect,
  setListSelect,
  className,
  theme = "light",
}) => {
  const [open, setOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const handleAddListSelect = (item: string) => {
    if (!listSelect.find((i) => i === item)) {
      setListSelect([...listSelect, item]);
    }
  };
  const handleClickDelete = (item: string) => {
    setListSelect(listSelect.filter((i) => i !== item));
  };
  const handleChangeOpen = (e: any) => {
    if (topRef.current) {
      if (
        e.target.className === cx("select__top") ||
        e.target.className === cx("select__items")
      ) {
        setOpen(!open);
      }
    }
  };

  return (
    <div
      className={cx("select", `select-${theme}`, className, {
        open,
      })}
    >
      <OutsideClickHandler onOutsideClick={setOpen}>
        <p className={cx("select__title", "small")}>{title}</p>
        <div
          role="presentation"
          ref={topRef}
          onClick={(e) => handleChangeOpen(e)}
          className={cx("select__top")}
        >
          <div className={cx("select__items")}>
            {listSelect.map((i) => (
              <Genre
                theme={theme}
                className={cx("select__genre")}
                key={i}
                onClick={() => handleClickDelete(i)}
                close
              >
                {i}
              </Genre>
            ))}
          </div>
          <button type="button" className={cx("select__icon")}>
            <Expand />
          </button>
        </div>
        <div className={cx("select__wrapper")}>
          <div className={cx("select__body", "scroll")}>
            <ul className={cx("select__list")}>
              {list.map((i) => (
                <li key={i} className={cx("select__item")}>
                  <button
                    type="button"
                    onClick={() =>
                      listSelect.some((item) => item === i)
                        ? handleClickDelete(i)
                        : handleAddListSelect(i)
                    }
                    className={cx("select__button")}
                  >
                    <Checkbox
                      checked={listSelect.some((item) => item === i)}
                      htmlFor={i}
                      theme={theme}
                    />
                    <p className={cx("select__text", "base", "lh")}>{i}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};
export default Multiselect;
