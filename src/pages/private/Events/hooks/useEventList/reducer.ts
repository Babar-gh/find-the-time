import { convertToTimeInterval } from 'types/converters/toClientTypes';
import { Action, IState } from './types';

export const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case 'pickNextPage': {
      const loadedItems = (state.pagination.pageNumber + 1) * state.pageSize;

      if (state.totalItems !== null && loadedItems < state.totalItems) {
        const nextPageNumber = state.pagination.pageNumber + 1;

        return {
          ...state,
          pagination: {
            ...state.pagination,
            pageNumber: nextPageNumber,
          },
        };
      }

      return { ...state };
    }

    case 'applyFilter': {
      return {
        ...state,
        pagination: { ...state.pagination, pageNumber: 0 },
        totalItems: null,
        filter: { ...state.filter, ...action.payload },
      };
    }

    case 'applySorter': {
      return {
        ...state,
        pagination: { ...state.pagination, pageNumber: 0 },
        totalItems: null,
        sorter: { ...state.sorter, ...action.payload },
      };
    }

    case 'parseResponse': {
      const newItems = action.payload.items.map(
        ({ chosenInterval: chosenIntervalRaw, ...restRaw }) => ({
          chosenInterval: chosenIntervalRaw
            ? convertToTimeInterval(chosenIntervalRaw)
            : null,
          ...restRaw,
        })
      );

      return {
        ...state,
        totalItems: action.payload.totalItems,
        items:
          state.pagination.pageNumber === 0
            ? [...newItems]
            : [...state.items, ...newItems],
      };
    }

    case 'setIsLoading': {
      return { ...state, isLoading: action.payload };
    }
  }
};
