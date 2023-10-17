export interface IFilterValue {
  _id: string;
  name: string;
}

export interface IFilters {
  sortBy: string;
  name: string;
  orderBy: string;
  genres: string[];
  perPage: number;
  pageNumber: number;
}
