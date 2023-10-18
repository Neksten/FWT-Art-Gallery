import { FC, PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";

import { useAppSelector } from "@/hooks/redux";
import { useFilters } from "@/context/FiltersContext";

interface FiltersLayoutProps extends PropsWithChildren {
  urlSearch: string;
}

const FiltersLayout: FC<FiltersLayoutProps> = ({ urlSearch, children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const {
    filters,
    changeFilters,
    changeFiltersLoaded,
    filtersLoaded,
    initialFilters,
  } = useFilters();

  useEffect(() => {
    changeFilters(initialFilters);
  }, [changeFilters, pathname, initialFilters]);

  useEffect(() => {
    if (!urlSearch && isAuth) {
      navigate(`?${qs.stringify(filtersLoaded)}`);

      return;
    }

    const params = qs.parse(urlSearch.substring(1));
    const defaultFilters = { ...filters, ...params };

    navigate(`?${qs.stringify(params)}`);
    changeFiltersLoaded(defaultFilters);
    changeFilters(defaultFilters);
    // eslint-disable-next-line
  }, [isAuth]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default FiltersLayout;
