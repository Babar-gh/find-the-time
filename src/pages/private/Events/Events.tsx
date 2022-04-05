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
  const list = useEventList(PAGE_SIZE);

  const { sentinel } = useIntersection(list.getNextPage);

  return (
    <Page
      title="Events"
      headerAddon={
        <DummyPageCounter
          current={(list.pagination.pageNumber + 1) * PAGE_SIZE}
          total={list.totalItems}
        />
      }
    >
      <div style={{ marginBottom: '32px' }}>
        <Button
          elementProps={{ onClick: () => list.applyFilter({ title: '1' }) }}
        >
          Apply test filter
        </Button>
      </div>
      <div className={styles['EventList']}>
        {list.items.map(({ id, ...rest }, i) => (
          <EventTile id={id} key={i} {...rest} />
        ))}
        <div ref={sentinel} />
        {list.isLoading && <LoaderTile isShown={list.isLoading} />}
      </div>
    </Page>
  );
};

export default Events;
