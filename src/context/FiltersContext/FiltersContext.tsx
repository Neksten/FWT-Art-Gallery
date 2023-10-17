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
  changeFilters: (filters: IFilters) => void;
  clearFilters: () => void;
}

export const defaultValueFilters: IFilters = {
  sortBy: "name",
  name: "",
  orderBy: "A-Z",
  genres: [],
  perPage: 6,
  pageNumber: 1,
};

const initialFiltersValue: IContext = {
  filters: defaultValueFilters,
  changeFilters: () => {},
  clearFilters: () => {},
};

const FiltersContext = createContext<IContext>(initialFiltersValue);

export const FiltersProvider: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  const [filters, setFilters] = useState(defaultValueFilters);

  const changeFilters = useCallback((value: IFilters): void => {
    setFilters(value);
  }, []);

  const clearFilters = () => {
    setFilters(defaultValueFilters);
  };

  const contextValue = useMemo(
    () => ({ filters, changeFilters, clearFilters }),
    [filters, changeFilters]
  );

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
