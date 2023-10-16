import { FC, MouseEvent, useRef, useState } from "react";
import classNames from "classnames/bind";

import { IGenre } from "@/models/IGenre";

import { OutsideClickHandler } from "@/components/OutsideClickHandler";
import { Checkbox } from "@/ui/Checkbox";
import { Genre } from "@/ui/Genre";
import { Error } from "@/ui/Error";
import { ReactComponent as Expand } from "@/assets/icons/expand.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface MultiselectProps {
  title: string;
  list: IGenre[];
  selectedList: IGenre[];
  className: string;
  theme?: "light" | "dark";
  error?: string;
  onChange: (value: any) => void;
  onBlur: () => void;
}

const Multiselect: FC<MultiselectProps> = ({
  title,
  list,
  selectedList,
  className,
  onBlur,
  onChange,
  error,
  theme = "light",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const handleAddOrDelete = (item: IGenre) => {
    const updatedSelected = selectedList.some((i) => i._id === item._id)
      ? selectedList.filter((i) => i._id !== item._id)
      : [...selectedList, item];

    onChange(updatedSelected);
  };

  const handleClose = () => {
    if (!isOpen) {
      return;
    }

    setIsOpen(false);
    onBlur();
  };

  const handleChangeOpen = (e: MouseEvent<HTMLDivElement>) => {
    if (topRef.current && e.target instanceof HTMLElement) {
      if (
        e.target.className === cx("select__top") ||
        e.target.className === cx("select__items")
      ) {
        setIsOpen(!isOpen);
      }
    }
    if (isOpen) {
      onBlur();
    }
  };

  return (
    <div
      className={cx("select", `select-${theme}`, className, {
        open: isOpen,
        error,
      })}
    >
      <p className={cx("select__title", "small")}>{title}</p>
      <OutsideClickHandler onOutsideClick={() => handleClose()}>
        <div
          role="presentation"
          ref={topRef}
          onClick={(e) => handleChangeOpen(e)}
          className={cx("select__top")}
        >
          <div className={cx("select__items")}>
            {selectedList.map((i) => (
              <Genre
                theme={theme}
                className={cx("select__genre")}
                key={i._id}
                onClick={() => handleAddOrDelete(i)}
                close
              >
                {i.name}
              </Genre>
            ))}
          </div>
          <button type="button" className={cx("select__icon")}>
            <Expand />
          </button>
        </div>
        <div className={cx("select__content")}>
          <div className={cx("select__wrapper")}>
            <div className={cx("select__body", "scroll")}>
              <ul className={cx("select__list")}>
                {list.map(
                  (i) =>
                    i?.name && (
                      <li key={i._id} className={cx("select__item")}>
                        <button
                          type="button"
                          onClick={() => handleAddOrDelete(i)}
                          className={cx("select__button")}
                        >
                          <Checkbox
                            checked={selectedList.some(
                              (item) => item._id === i._id
                            )}
                            name={i.name}
                            theme={theme}
                          />
                          <p className={cx("select__text", "base", "lh")}>
                            {i.name}
                          </p>
                        </button>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
      {error && !isOpen && <Error error={error} />}
    </div>
  );
};
export default Multiselect;
