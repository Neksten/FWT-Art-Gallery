import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { IFilterValue, TFilterType } from "@/models/Filter";

import { ReactComponent as Plus } from "@/assets/icons/plus.svg";
import { ReactComponent as Minus } from "@/assets/icons/minus.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export interface FilterButtonProps<T> {
  title: string;
  list: IFilterValue[];
  filter: T;
  theme: "light" | "dark";
  onChange: (value: T) => void;
}

const Filter = ({
  title,
  list,
  filter,
  theme,
  onChange,
}: FilterButtonProps<TFilterType>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [heightBody, setHeightBody] = useState(0);
  const listRef = useRef<null | HTMLUListElement>(null);

  const handleChange = (item: IFilterValue) => {
    if (filter.type === "genres") {
      const values = filter.values.some((i) => i === item._id)
        ? filter.values.filter((i) => i !== item._id)
        : [...filter.values, item._id];
      onChange({ ...filter, values });
    }
    if (filter.type === "sortBy") {
      onChange({ ...filter, value: item.name });
    }
  };

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
          {"values" in filter &&
            filter.values.length > 0 &&
            `(${filter.values.length})`}
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
                onClick={() => handleChange(item)}
                className={cx("filter__button", {
                  select:
                    ("values" in filter &&
                      filter.values.some((i) => i === item._id)) ||
                    ("value" in filter && filter.value === item.name),
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
