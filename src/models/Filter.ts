export interface IFilterValue {
  _id: string;
  name: string;
}

export interface IGenreFilter {
  type: "genres";
  values: string[];
}

export interface IOrderByFilter {
  type: "orderBy";
  value: string;
}

export type TFilterType = IGenreFilter | IOrderByFilter;

export interface IFiltersRequest {
  sortBy?: "name";
  name?: string;
  orderBy?: "asc" | "desc";
  genres?: string[];
  perPage?: number;
  pageNumber?: number;
}
