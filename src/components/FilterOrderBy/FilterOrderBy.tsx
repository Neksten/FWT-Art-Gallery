import React, { FC } from "react";
import { Filter } from "@/ui/Filter";
import { useTheme } from "@/context/ThemeContext";
import { useFilters } from "@/context/FiltersContext";
import { IFilterValue } from "@/models/Filter";

export interface FilterSortByProps {
  list: IFilterValue[];
}

const FilterOrderBy: FC<FilterSortByProps> = ({ list }) => {
  const { theme } = useTheme();
  const { changeFilters, filters } = useFilters();
  const { orderBy } = filters;

  const handleChange = (item: IFilterValue) => {
    changeFilters({ ...filters, orderBy: item.name });
  };

  return (
    <Filter
      title="Sort By"
      list={list}
      theme={theme}
      onChange={handleChange}
      trackSelect={(item) => orderBy === item.name}
    />
  );
};

export default FilterOrderBy;
