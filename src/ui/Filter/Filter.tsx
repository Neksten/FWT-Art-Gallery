import { FC, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { IFilterValue } from "@/models/Filter";

import { ReactComponent as Plus } from "@/assets/icons/plus.svg";
import { ReactComponent as Minus } from "@/assets/icons/minus.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export interface FilterProps {
  title: string;
  length?: number;
  list: IFilterValue[];
  theme: "light" | "dark";
  onChange: (value: IFilterValue) => void;
  trackSelect: (value: IFilterValue) => boolean;
}

const Filter: FC<FilterProps> = ({
  title,
  list,
  length = 0,
  theme,
  onChange,
  trackSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [heightBody, setHeightBody] = useState(0);
  const listRef = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    if (isOpen && listRef !== null && listRef.current != null) {
      setHeightBody(listRef.current.clientHeight);
    } else {
      setHeightBody(0);
    }
  }, [isOpen, setHeightBody]);

  return (
    <div className={cx("filter", `filter-${theme}`)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cx("filter__top")}
      >
        <h6 className={cx("filter__title")}>
          {title}
          {length > 0 && ` (${length})`}
        </h6>
        <div className={cx("filter__icon")}>
          {isOpen ? <Minus /> : <Plus />}
        </div>
      </button>
      <div
        style={{ maxHeight: `${heightBody}px` }}
        className={cx("filter__body")}
      >
        <ul ref={listRef} className={cx("filter__list")}>
          {list.map((item) => (
            <li key={item._id} className={cx("filter__item")}>
              <button
                type="button"
                onClick={() => onChange(item)}
                className={cx("filter__button", {
                  select: trackSelect(item),
                })}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
