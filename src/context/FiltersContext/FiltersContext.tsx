import {
  createContext,
  FC,
  HTMLAttributes,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { IFilters } from "@/models/Filter";

interface IContext {
  filters: IFilters;
  filtersLoaded: IFilters;
  initialFilters: IFilters;
  changeFilters: (filters: IFilters) => void;
  changeFiltersLoaded: (filters: IFilters) => void;
  clearFilters: () => void;
}

export const initialFilters: IFilters = {
  sortBy: "name",
  name: "",
  orderBy: "A-Z",
  genres: [],
  perPage: 6,
  pageNumber: 1,
};

export const initialFiltersValue: IContext = {
  filters: initialFilters,
  filtersLoaded: initialFilters,
  initialFilters,
  changeFilters: () => {},
  changeFiltersLoaded: () => {},
  clearFilters: () => {},
};

const FiltersContext = createContext<IContext>(initialFiltersValue);

export const FiltersProvider: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  const [filtersLoaded, setFiltersLoaded] = useState(initialFilters);
  const [filters, setFilters] = useState(filtersLoaded);

  const changeFilters = useCallback((value: IFilters): void => {
    setFilters(value);
  }, []);

  const changeFiltersLoaded = useCallback((value: IFilters): void => {
    setFiltersLoaded(value);
  }, []);

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const contextValue = useMemo(
    () => ({
      filters,
      filtersLoaded,
      initialFilters,
      changeFilters,
      changeFiltersLoaded,
      clearFilters,
    }),
    [filters, filtersLoaded, changeFilters, changeFiltersLoaded]
  );

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
