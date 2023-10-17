import { FC } from "react";
import classNames from "classnames/bind";

import { useFilters } from "@/context/FiltersContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { Button } from "@/ui/Button";
import { IconButton } from "@/ui/IconButton";
import { InputSearch } from "@/ui/InputSearch";
import { ReactComponent as Plus } from "@/assets/icons/plus.svg";
import { ReactComponent as Filters } from "@/assets/icons/filter.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface HomeMenuProps {
  setIsOpenAddModal: (value: boolean) => void;
  setIsOpenFiltersModal: (value: boolean) => void;
}

const HomeMenu: FC<HomeMenuProps> = ({
  setIsOpenAddModal,
  setIsOpenFiltersModal,
}) => {
  const { theme } = useTheme();
  const { filters, changeFilters } = useFilters();
  const { isAuth } = useAppSelector((state) => state.authSlice);

  return (
    <nav className={cx("menu")}>
      {isAuth && (
        <>
          <Button
            onClick={() => setIsOpenAddModal(true)}
            variant="outlined"
            startIcon={<Plus />}
            theme={theme}
          >
            Add Artist
          </Button>
          <div className={cx("menu__right")}>
            <InputSearch
              value={filters.name}
              setValue={(value: string) =>
                changeFilters({ ...filters, name: value })
              }
              placeholder="Search"
              theme={theme}
              className={cx("menu__search")}
            />
            <IconButton
              onClick={() => setIsOpenFiltersModal(true)}
              theme={theme}
            >
              <Filters />
            </IconButton>
          </div>
        </>
      )}
    </nav>
  );
};

export default HomeMenu;
