type SortDirection = 'ascending' | 'descending';

export interface ISorter<SortableBy> {
  sortBy: SortableBy;
  direction: SortDirection;
}

export interface IPagination {
  pageNumber: number;
  pageSize: number;
}

export interface ISearchConstraints<Filter, SortableBy> {
  filter: Filter;
  sorter: ISorter<SortableBy>;
  pagination: IPagination;
}

export interface ISearchResult<Item> {
  items: Item[];
  totalItems: number;
}
