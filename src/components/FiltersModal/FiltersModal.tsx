import { FC } from "react";
import classNames from "classnames/bind";

import { useGetGenresQuery } from "@/store/genre/genre.api";
import { useAppSelector } from "@/hooks/redux";
import { useTheme } from "@/context/ThemeContext";
import { useFilters } from "@/context/FiltersContext";
import { IFilterValue } from "@/models/Filter";

import { Modal } from "@/components/Modal";
import { FilterGenres } from "@/components/FilterGenres";
import { FilterOrderBy } from "@/components/FilterOrderBy";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface FiltersModalProps {
  setIsOpen: (value: boolean) => void;
}

const sortByList: IFilterValue[] = [
  { _id: "1", name: "A-Z" },
  { _id: "2", name: "Z-A" },
];

const FiltersModal: FC<FiltersModalProps> = ({ setIsOpen }) => {
  const { theme } = useTheme();
  const { clearFilters } = useFilters();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const { data: genresData } = useGetGenresQuery(
    { isAuth },
    { skip: isAuth === null }
  );

  return (
    <Modal
      className={cx("modal", `modal-${theme}`)}
      classNameClose={cx("modal__close")}
      variant="menu"
      closeModal={() => setIsOpen(false)}
    >
      <div className={cx("modal__filters")}>
        <FilterGenres list={genresData || []} />
        <FilterOrderBy list={sortByList} />
      </div>
      <div className={cx("modal__management")}>
        <button type="button" className={cx("modal__button")}>
          show the results
        </button>
        <button
          type="button"
          onClick={clearFilters}
          className={cx("modal__button", "hidden")}
        >
          clear
        </button>
      </div>
    </Modal>
  );
};

export default FiltersModal;
