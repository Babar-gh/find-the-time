import { useCallback, useEffect, useReducer, useState } from 'react';
import { searchEvents } from 'api/events';
import { IEventSearchResponse } from 'api/types/events';
import { Filter, reducer } from './reducer';

const useEventList = (pageSize: number) => {
  const initialState = { pagination: { pageSize, pageNumber: 0 } };
  const [constraints, dispatchConstraints] = useReducer(reducer, initialState);

  const [list, setList] = useState<IEventSearchResponse['items']>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = useCallback(async () => {
    setIsLoading(true);

    const response = await searchEvents(constraints);

    if (totalPages === null) {
      setTotalPages(Math.ceil(response.data.totalItems / pageSize));
    }

    setList((list) => [...list, ...response.data.items]);

    setIsLoading(false);
  }, [pageSize, totalPages, constraints]);

  useEffect(() => {
    const currentPage = constraints.pagination.pageNumber;

    if (
      totalPages === null ||
      (currentPage !== 0 && currentPage < totalPages)
    ) {
      getEvents();
    }
  }, [totalPages, constraints, getEvents]);

  return {
    list,
    isLoading,
    currentPage: constraints.pagination.pageNumber,
    totalPages,
    getNextPage: () => dispatchConstraints({ type: 'pickNextPage' }),
    filterByOwnership: (isOrganizer: Filter['isOrganizer']) =>
      dispatchConstraints({ type: 'filterByOwnership', payload: isOrganizer }),
    filterByStatus: (status: Filter['status']) =>
      dispatchConstraints({ type: 'filterByStatus', payload: status }),
    filterByTitle: (title: Filter['title']) =>
      dispatchConstraints({ type: 'filterByTitle', payload: title }),
    filterByLocation: (location: Filter['location']) =>
      dispatchConstraints({ type: 'filterByLocation', payload: location }),
  };
};

export default useEventList;
