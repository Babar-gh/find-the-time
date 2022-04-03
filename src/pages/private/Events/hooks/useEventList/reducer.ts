import { IEventSearchRequest } from 'api/types/events';
import { Action } from './types';

export const reducer = (
  state: IEventSearchRequest,
  action: Action
): IEventSearchRequest => {
  const newState = { ...state };

  switch (action.type) {
    case 'pickNextPage': {
      const nextPageNumber = state.pagination.pageNumber + 1;
      newState.pagination = { ...state.pagination, pageNumber: nextPageNumber };

      return newState;
    }

    case 'applyFilter': {
      newState.pagination.pageNumber = 0;

      newState.filter = { ...state.filter, ...action.payload };

      return newState;
    }

    case 'applySorter': {
      newState.pagination.pageNumber = 0;

      newState.sorter = action.payload ? { ...action.payload } : undefined;

      return newState;
    }
  }
};
