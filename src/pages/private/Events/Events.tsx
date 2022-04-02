import { useEffect, useRef, useState } from 'react';
import Loader from 'ui-kit/Loader';
import Page from 'ui-kit/Page';
import styles from './Events.module.scss';
import EventTile from './components/EventTile';
import useEventList from './hooks/useEventList';
import { DummyPageCounter } from './components/DummyPageCounter/DummyPageCounter';

const PAGE_SIZE = 10;

const Events: React.VFC = () => {
  const { list, isLoading, getNextPage, currentPage, totalPages } =
    useEventList(PAGE_SIZE);

  const [lastItem, setLastItem] = useState<HTMLDivElement | null>(null);

  const observer = useRef(
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        getNextPage();
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

  return (
    <Page
      title="Events"
      headerAddon={<DummyPageCounter {...{ currentPage, totalPages }} />}
    >
      <Loader isShown={isLoading}>
        <div className={styles['EventList']}>
          {list.map(({ id, ...rest }, i) => {
            const ref = i === list.length - 1 ? setLastItem : undefined;

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
