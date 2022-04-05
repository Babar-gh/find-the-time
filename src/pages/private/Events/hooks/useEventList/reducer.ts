import { Action, IState } from './types';

export const reducer = (state: IState, action: Action): IState => {
  const newState = { ...state };

  switch (action.type) {
    case 'pickNextPage': {
      const loadedItems = (state.pagination.pageNumber + 1) * state.pageSize;

      if (state.totalItems !== null && loadedItems < state.totalItems) {
        const nextPageNumber = state.pagination.pageNumber + 1;
        newState.pagination = {
          ...state.pagination,
          pageNumber: nextPageNumber,
        };
      }

      return newState;
    }

    case 'applyFilter': {
      newState.pagination = { ...state.pagination, pageNumber: 0 };
      newState.totalItems = null;

      newState.filter = { ...state.filter, ...action.payload };

      return newState;
    }

    case 'applySorter': {
      newState.pagination = { ...state.pagination, pageNumber: 0 };
      newState.totalItems = null;

      newState.sorter = action.payload ? { ...action.payload } : undefined;

      return newState;
    }

    case 'parseResponse': {
      newState.totalItems = action.payload.totalItems;

      newState.items =
        state.pagination.pageNumber === 0
          ? [...action.payload.items]
          : [...state.items, ...action.payload.items];

      return newState;
    }

    case 'setIsLoading': {
      newState.isLoading = action.payload;

      return newState;
    }
  }
};
