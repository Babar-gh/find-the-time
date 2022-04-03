import Button from 'ui-kit/Button';
import Page from 'ui-kit/Page';
import useIntersection from 'hooks/useIntersection';
import EventTile from './components/EventTile';
import LoaderTile from './components/LoaderTile';
import styles from './Events.module.scss';
import useEventList from './hooks/useEventList';
import { DummyPageCounter } from './components/DummyPageCounter/DummyPageCounter';

const PAGE_SIZE = 10;

const Events: React.VFC = () => {
  const { list, isLoading, getNextPage, currentPage, totalPages, applyFilter } =
    useEventList(PAGE_SIZE);

  const { sentinel } = useIntersection(getNextPage);

  return (
    <Page
      title="Events"
      headerAddon={<DummyPageCounter {...{ currentPage, totalPages }} />}
    >
      <div style={{ marginBottom: '32px' }}>
        <Button elementProps={{ onClick: () => applyFilter({ title: '1' }) }}>
          Apply test filter
        </Button>
      </div>
      <div className={styles['EventList']}>
        {list.map(({ id, ...rest }, i) => (
          <EventTile id={id} key={i} {...rest} />
        ))}
        <div ref={sentinel} />
        {isLoading && <LoaderTile isShown={isLoading} />}
      </div>
    </Page>
  );
};

export default Events;
