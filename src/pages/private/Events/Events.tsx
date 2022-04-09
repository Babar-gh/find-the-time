import classNames from 'classnames/bind';
import Button from 'ui-kit/Button';
import LinkWrapper from 'components/LinkWrapper';
import Loader from 'ui-kit/Loader';
import Page from 'ui-kit/Page';
import useIntersection from 'hooks/useIntersection';
import { PRIVATE } from 'constants/routes';
import styles from './Events.module.scss';
import useEventList from './hooks/useEventList';
import { DummyPageCounter } from './components/DummyPageCounter/DummyPageCounter';
import EventTile from './components/EventTile';

const cn = classNames.bind(styles);

const PAGE_SIZE = 10;

const Events: React.VFC = () => {
  const list = useEventList(PAGE_SIZE);

  const { setSentinelRef } = useIntersection<HTMLElement>(list.getNextPage);

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
      <ul className={styles['List']}>
        {list.items.map(({ id, ...rest }, index) => {
          const isLast = list.items.length - 1 === index;

          return (
            <li
              className={styles['ListItem']}
              key={id}
              ref={isLast ? setSentinelRef : undefined}
            >
              <LinkWrapper
                type="RouterLink"
                to={`${PRIVATE.Events}/${id}`}
                className={styles['ListItemLink']}
              >
                <EventTile id={id} {...rest} />
              </LinkWrapper>
            </li>
          );
        })}
        {list.isLoading && (
          <Loader isShown={true}>
            <li className={cn('ListItem', 'ListItem_loader')} />
          </Loader>
        )}
      </ul>
    </Page>
  );
};

export default Events;
