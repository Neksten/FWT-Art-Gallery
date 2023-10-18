import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import qs from "qs";

import { IFilterValue } from "@/models/Filter";
import { useAppSelector } from "@/hooks/redux";
import { useTheme } from "@/context/ThemeContext";
import { useFilters } from "@/context/FiltersContext";
import { useGetGenresQuery } from "@/store/genre/genre.api";

import { Modal } from "@/components/Modal";
import { FilterGenres } from "@/components/FilterGenres";
import { FilterOrderBy } from "@/components/FilterOrderBy";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface FiltersModalProps {
  setIsOpen: (value: boolean) => void;
}

const orderByList: IFilterValue[] = [
  { _id: "1", name: "A-Z" },
  { _id: "2", name: "Z-A" },
];

const FiltersModal: FC<FiltersModalProps> = ({ setIsOpen }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {
    clearFilters,
    changeFilters,
    filtersLoaded,
    filters,
    initialFilters,
  } = useFilters();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [filtersSelect, setFiltersSelect] = useState(filtersLoaded);
  const { data: genresData } = useGetGenresQuery(
    { isAuth },
    { skip: isAuth === null }
  );

  const handleSubmit = () => {
    const filtersSending = {
      ...filters,
      genres: filtersSelect.genres,
      orderBy: filtersSelect.orderBy,
    };

    changeFilters(filtersSending);
    navigate(`?${qs.stringify(filtersSending)}`);
  };

  const handleClickClear = () => {
    clearFilters();
    setFiltersSelect(initialFilters);
    navigate(`?${qs.stringify(initialFilters)}`);
  };

  return (
    <Modal
      className={cx("modal", `modal-${theme}`)}
      classNameClose={cx("modal__close")}
      variant="menu"
      closeModal={() => setIsOpen(false)}
    >
      <div className={cx("modal__filters")}>
        <FilterGenres
          list={genresData || []}
          listSelect={filtersSelect.genres}
          setListSelect={(genres) =>
            setFiltersSelect((prev) => ({ ...prev, genres }))
          }
        />
        <FilterOrderBy
          list={orderByList}
          valueSelect={
            orderByList.find((i) => i.name === filtersSelect.orderBy) ||
            orderByList[0]
          }
          setValueSelect={(orderBy) =>
            setFiltersSelect((prev) => ({ ...prev, orderBy: orderBy.name }))
          }
        />
      </div>
      <div className={cx("modal__management")}>
        <button
          type="button"
          onClick={handleSubmit}
          className={cx("modal__button")}
        >
          show the results
        </button>
        <button
          type="button"
          onClick={handleClickClear}
          className={cx("modal__button", "hidden")}
        >
          clear
        </button>
      </div>
    </Modal>
  );
};

export default FiltersModal;
