import React, { FC } from "react";
import { Filter } from "@/ui/Filter";
import { useTheme } from "@/context/ThemeContext";
import { useFilters } from "@/context/FiltersContext";
import { IFilterValue, IOrderByFilter } from "@/models/Filter";

export interface FilterSortByProps {
  list: IFilterValue[];
}

const FilterOrderBy: FC<FilterSortByProps> = ({ list }) => {
  const { theme } = useTheme();
  const { changeFilters, filters } = useFilters();
  const sortBy = filters[1] as IOrderByFilter;

  const handleChange = (item: IFilterValue) => {
    changeFilters(1, { ...sortBy, value: item.name });
  };

  return (
    <Filter
      title="Sort By"
      list={list}
      theme={theme}
      onChange={handleChange}
      trackSelect={(item) => sortBy.value === item.name}
    />
  );
};

export default FilterOrderBy;
