import { IEventSearchRequest } from 'api/types/events';

export type Filter = NonNullable<IEventSearchRequest['filter']>;

type Action =
  | { type: 'pickNextPage' }
  | { type: 'filterByOwnership'; payload: Filter['isOrganizer'] }
  | { type: 'filterByStatus'; payload: Filter['status'] }
  | { type: 'filterByTitle'; payload: Filter['title'] }
  | { type: 'filterByLocation'; payload: Filter['location'] };

const cloneState = (state: IEventSearchRequest): IEventSearchRequest => ({
  filter: { ...state.filter },
  sorter: state.sorter ? { ...state.sorter } : undefined,
  pagination: { ...state.pagination },
});

export const reducer = (
  state: IEventSearchRequest,
  action: Action
): IEventSearchRequest => {
  const upadetedState = cloneState(state);

  switch (action.type) {
    case 'pickNextPage': {
      const nextPageNumber = state.pagination.pageNumber + 1;
      upadetedState.pagination.pageNumber = nextPageNumber;

      return upadetedState;
    }

    case 'filterByOwnership': {
      upadetedState.filter ??= {};
      upadetedState.filter.isOrganizer = action.payload;

      return upadetedState;
    }

    case 'filterByStatus': {
      upadetedState.filter ??= {};
      upadetedState.filter.status = action.payload;

      return upadetedState;
    }

    case 'filterByTitle': {
      upadetedState.filter ??= {};
      upadetedState.filter.title = action.payload;

      return upadetedState;
    }

    case 'filterByLocation': {
      upadetedState.filter ??= {};
      upadetedState.filter.location = action.payload;

      return upadetedState;
    }
  }
};
