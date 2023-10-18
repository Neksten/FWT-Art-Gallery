import { FC, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { uid } from "uid";

import { getPageRange } from "@/utils/getPageRange";

import { ReactComponent as ArrowPrev } from "@/assets/icons/arrow-left.svg";
import { ReactComponent as ArrowNext } from "@/assets/icons/arrow-right.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface PaginationProps {
  theme?: "light" | "dark";
  initialPages: number[];
  activePage: number;
  setActivePage: (value: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  theme = "light",
  initialPages,
  activePage,
  setActivePage,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    setPages(getPageRange(initialPages, activePage));
    // eslint-disable-next-line
  }, [activePage, setPages]);

  return (
    <div className={cx("pagination", `pagination-${theme}`)}>
      <button
        type="button"
        onClick={() =>
          setActivePage(activePage > 1 ? activePage - 1 : activePage)
        }
        className={cx("pagination__prev")}
      >
        <ArrowPrev />
      </button>
      <ul className={cx("pagination__list")}>
        {pages.map((i) =>
          i ? (
            <li key={i} className={cx("pagination__item")}>
              <button
                type="button"
                onClick={() => setActivePage(i)}
                className={cx("pagination__button", {
                  selected: activePage === i,
                })}
              >
                {i}
              </button>
            </li>
          ) : (
            <li key={uid()} className={cx("pagination__item")}>
              ...
            </li>
          )
        )}
      </ul>
      <button
        type="button"
        onClick={() =>
          setActivePage(
            activePage < initialPages[initialPages.length - 1]
              ? activePage + 1
              : activePage
          )
        }
        className={cx("pagination__next")}
      >
        <ArrowNext />
      </button>
    </div>
  );
};

export default Pagination;
