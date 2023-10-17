import { FC } from "react";
import classNames from "classnames/bind";

import { useGetGenresQuery } from "@/store/genre/genre.api";
import { useFilters } from "@/context/FiltersContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { AddArtistButton } from "@/components/AddArtistButton";
import { FilterButton } from "@/components/FilterButton";
import { InputSearch } from "@/ui/InputSearch";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const HomeMenu: FC = () => {
  const { theme } = useTheme();
  const { filters, changeFilters } = useFilters();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const { data: genresData } = useGetGenresQuery(
    { isAuth },
    { skip: isAuth === null }
  );

  return (
    <nav className={cx("menu")}>
      {isAuth && (
        <>
          {genresData && <AddArtistButton genresList={genresData} />}
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
            <FilterButton />
          </div>
        </>
      )}
    </nav>
  );
};

export default HomeMenu;
