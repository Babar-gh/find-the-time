export type SortDirection = 'ascending' | 'descending';

export interface ISorter {
  sortBy: string;
  direction: SortDirection;
}

export interface IPagination {
  pageNumber: number;
  pageSize: number;
}

export interface ISearchConfig<Filter, Sorter extends ISorter> {
  filter?: Filter;
  sorter?: Sorter;
  pagination: IPagination;
}

export interface ISearchResult<Item> {
  items: Item[];
  totalItems: number;
}
