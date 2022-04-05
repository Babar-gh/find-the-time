import { useEffect, useReducer } from 'react';
import { searchEvents } from 'api/events';
import { IEventSearchRequest } from 'api/types/events';
import { reducer } from './reducer';
import { IState, Payload } from './types';

const useEventList = (pageSize: number) => {
  const initialState: IState = {
    pagination: { pageSize, pageNumber: 0 },
    items: [],
    totalItems: null,
    pageSize,
    isLoading: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchEvents = async () => {
      dispatch({ type: 'setIsLoading', payload: true });

      const request: IEventSearchRequest = {
        pagination: state.pagination,
        filter: state.filter,
        sorter: state.sorter,
      };

      const response = await searchEvents(request);

      dispatch({ type: 'parseResponse', payload: response.data });

      dispatch({ type: 'setIsLoading', payload: false });
    };

    fetchEvents();
  }, [state.pagination, state.filter, state.sorter]);

  const externalDispatchHelpers = {
    getNextPage: () => dispatch({ type: 'pickNextPage' }),
    applyFilter: (filter: Payload<'applyFilter'>) =>
      dispatch({ type: 'applyFilter', payload: filter }),
    applySorter: (sorter: Payload<'applySorter'>) =>
      dispatch({ type: 'applySorter', payload: sorter }),
  };

  return {
    ...state,
    ...externalDispatchHelpers,
  };
};

export default useEventList;
