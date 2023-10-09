import { FC } from "react";
import { IFilterValue, IGenreFilter } from "@/models/Filter";
import { Filter } from "@/ui/Filter";
import { useFilters } from "@/context/FiltersContext";
import { useTheme } from "@/context/ThemeContext";

export interface FilterGenresProps {
  list: IFilterValue[];
}

const FilterGenres: FC<FilterGenresProps> = ({ list }) => {
  const { theme } = useTheme();
  const { changeFilters, filters } = useFilters();
  const genres = filters[0] as IGenreFilter;

  const handleChange = (item: IFilterValue) => {
    const values = genres.values.some((i) => i === item._id)
      ? genres.values.filter((i) => i !== item._id)
      : [...genres.values, item._id];

    changeFilters(0, { ...genres, values });
  };

  return (
    <Filter
      title="Genres"
      list={list}
      length={genres.values.length}
      theme={theme}
      onChange={handleChange}
      trackSelect={(item) => genres.values.some((i) => i === item._id)}
    />
  );
};

export default FilterGenres;
