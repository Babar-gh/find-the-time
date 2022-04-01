import { useCallback, useEffect, useRef, useState } from 'react';
import Loader from 'ui-kit/Loader';
import Page from 'ui-kit/Page';
import { IEvent } from 'api/types/events';
import { searchEvents } from 'api/events';
import styles from './Events.module.scss';
import EventTile from './components/EventTile';

const PAGE_SIZE = 10;

const Events: React.VFC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const [eventList, setEventList] = useState<Omit<IEvent, 'subscriptions'>[]>(
    []
  );
  const [lastItem, setLastItem] = useState<HTMLDivElement | null>(null);

  const observer = useRef(
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && pageNumber + 1 !== totalPages) {
        setPageNumber((current) => current + 1);
      }
    })
  );

  useEffect(() => {
    const currentElement = lastItem;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastItem]);

  const loadMoreEvents = useCallback(async () => {
    setIsLoading(true);

    const response = await searchEvents({
      pagination: { pageNumber, pageSize: PAGE_SIZE },
    });

    if (totalPages === null) {
      setTotalPages(Math.ceil(response.data.totalItems / PAGE_SIZE));
    }

    setEventList((list) => [...list, ...response.data.items]);

    setIsLoading(false);
  }, [pageNumber, totalPages]);

  useEffect(() => {
    if (
      totalPages === null ||
      (pageNumber + 1 <= totalPages && pageNumber !== 0)
    ) {
      loadMoreEvents();
    }
  }, [pageNumber, totalPages, loadMoreEvents]);

  return (
    <Page
      title="Events"
      headerAddon={
        <div
          style={{
            color: 'black',
            backgroundColor: 'orange',
            position: 'fixed',
            right: '16px',
            padding: '16px',
            borderRadius: '8px',
            zIndex: 1000,
          }}
        >
          Страница: {pageNumber + 1} из {totalPages}
        </div>
      }
    >
      <Loader isShown={isLoading}>
        <div className={styles['EventList']}>
          {eventList.map(({ id, ...rest }, i) => {
            const ref = i === eventList.length - 1 ? setLastItem : undefined;

            return (
              <div key={i} ref={ref}>
                <EventTile id={id} {...rest} />
              </div>
            );
          })}
        </div>
      </Loader>
    </Page>
  );
};

export default Events;
