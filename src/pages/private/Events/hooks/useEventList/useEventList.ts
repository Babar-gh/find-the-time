import { useCallback, useEffect, useReducer, useState } from 'react';
import { searchEvents } from 'api/events';
import { IEventSearchResponse } from 'api/types/events';
import { reducer } from './reducer';
import { Payload } from './types';

const useEventList = (pageSize: number) => {
  const initialConstraints = { pagination: { pageSize, pageNumber: 0 } };
  const [constraints, dispatchConstraints] = useReducer(
    reducer,
    initialConstraints
  );

  const [list, setList] = useState<IEventSearchResponse['items']>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = useCallback(async () => {
    setIsLoading(true);

    const response = await searchEvents(constraints);

    if (totalPages === null) {
      const responseTotalPages = Math.ceil(response.data.totalItems / pageSize);
      setTotalPages(responseTotalPages);

      setList([...response.data.items]);
    } else {
      setList((list) => [...list, ...response.data.items]);
    }

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

  const getNextPage = () => dispatchConstraints({ type: 'pickNextPage' });

  const applyFilter = (filter: Payload<'applyFilter'>) => {
    setTotalPages(null);
    dispatchConstraints({ type: 'applyFilter', payload: filter });
  };

  const applySorter = (sorter: Payload<'applySorter'>) => {
    setTotalPages(null);
    dispatchConstraints({ type: 'applySorter', payload: sorter });
  };

  return {
    list,
    isLoading,
    currentPage: constraints.pagination.pageNumber,
    totalPages,
    getNextPage,
    applyFilter,
    applySorter,
  };
};

export default useEventList;
