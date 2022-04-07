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

  const getNextPage = () => dispatch({ type: 'pickNextPage' });

  const applyFilter = (filter: Payload<'applyFilter'>) =>
    dispatch({ type: 'applyFilter', payload: filter });

  const applySorter = (sorter: Payload<'applySorter'>) =>
    dispatch({ type: 'applySorter', payload: sorter });

  const parseResponse = (response: Payload<'parseResponse'>) =>
    dispatch({ type: 'parseResponse', payload: response });

  const setIsLoading = (isLoading: Payload<'setIsLoading'>) =>
    dispatch({ type: 'setIsLoading', payload: isLoading });

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);

      const request: IEventSearchRequest = {
        pagination: state.pagination,
        filter: state.filter,
        sorter: state.sorter,
      };

      const response = await searchEvents(request);

      parseResponse(response.data);

      setIsLoading(false);
    };

    fetchEvents();
  }, [state.pagination, state.filter, state.sorter]);

  return {
    ...state,
    getNextPage,
    applyFilter,
    applySorter,
  };
};

export default useEventList;
