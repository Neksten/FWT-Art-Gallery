export interface IFilterValue {
  _id: string;
  name: string;
}

interface GenreFilter {
  type: "genres";
  values: string[];
}

interface OrderByFilter {
  type: "sortBy";
  value: string;
}

export type TFilterType = GenreFilter | OrderByFilter;

export interface IFiltersRequest {
  sortBy?: "name";
  name?: string;
  orderBy?: "asc" | "desc";
  genres?: string[];
  perPage?: number;
  pageNumber?: number;
}
